import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  try {
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!store) {
      redirect('/');
    }
  } catch (error) {
    console.log('test');
    console.error("Prisma query error:", error);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}