import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import SearchBar from "../_components/searchBar";
import CryptoTable from "./_components/cryptoTable";

const CryptoPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

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
          <CryptoTable />
        </ScrollArea>
      </div>
    </>
  );
};

export default CryptoPage;
