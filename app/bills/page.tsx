import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddBillButton from "../_components/addBillButton";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/dataTable";
import { billColumns } from "./_columns";
import { db } from "../_lib/prisma";

const BillsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const bills = await db.bills.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 flex h-full flex-col max-h-screen overflow-hidden">
        {/* Título e botão */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Contas</h1>
          <AddBillButton />
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={billColumns}
            data={JSON.parse(JSON.stringify(bills))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default BillsPage;
