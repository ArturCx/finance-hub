import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/dataTable";
import { cryptoColumns } from "./_columns";
import SearchBar from "../_components/searchBar";

const CryptoPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const crypto = true;

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6 flex h-full flex-col max-h-screen overflow-hidden">
        {/* Título e botão */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Crypto</h1>
          <SearchBar />
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={cryptoColumns}
            data={JSON.parse(JSON.stringify(crypto))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default CryptoPage;
