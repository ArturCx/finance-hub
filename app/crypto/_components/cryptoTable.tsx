"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { DataTable } from "@/app/_components/ui/dataTable";
import { cryptoColumns } from "../_columns";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

export default function CryptosTable() {
  const [cryptos, setCryptos] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;

  const fetchCryptos = useCallback(async () => {
    try {
      const response = await fetch(`/api/cryptos?page=${page}&limit=${limit}`);
      const { cryptos, total } = await response.json();

      setCryptos(cryptos);
      setTotal(total);
    } catch (error) {
      console.error("Erro ao carregar as criptomoedas:", error);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  const totalPages = Math.ceil(total / limit);

  // Cálculo dinâmico das páginas visíveis
  const visiblePages = useMemo(() => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 5) {
      return pages;
    }

    if (page <= 3) {
      return [...pages.slice(0, 4), "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "...", ...pages.slice(totalPages - 4)];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  }, [page, totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="rounded-lg shadow border max-h-[750px] overflow-hidden">
        <ScrollArea className="h-[750px]">
          <DataTable columns={cryptoColumns} data={cryptos} />
        </ScrollArea>
      </div>
      <div className="rounded-lg mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page - 1);
                }}
              />
            </PaginationItem>
            {visiblePages.map((pageNumber, index) =>
              typeof pageNumber === "number" ? (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    isActive={pageNumber === page}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
