"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getResolvedMonthYear } from "@/app/_utils/monthYearFilter";

const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { month, year } = getResolvedMonthYear(
    searchParams.get("month"),
    searchParams.get("year")
  );

  const getHrefWithMonthYear =
    (basePath: string) => `${basePath}?month=${month}&year=${year}`;

  return (
    <nav className="flex justify-between border-b border-solid px-4 md:px-8 py-4">
      {/* Esquerda */}
      <div className="flex items-center gap-4 md:gap-10">
        <Image src="/logo.svg" width={130} height={40} alt="Finance AI" className="w-20 md:w-[130px] h-auto" />
        <Link
          href={getHrefWithMonthYear("/")}
          className={
            pathname === "/"
              ? "font-bold text-primary text-xs md:text-base"
              : "text-muted-foreground text-xs md:text-base"
          }
        >
          Dashboard
        </Link>
        <Link
          href={getHrefWithMonthYear("/transactions")}
          className={
            pathname === "/transactions"
              ? "font-bold text-primary text-xs md:text-base hidden sm:block"
              : "text-muted-foreground text-xs md:text-base hidden sm:block"
          }
        >
          Transações
        </Link>
        <Link
          href={getHrefWithMonthYear("/bills")}
          className={
            pathname === "/bills"
              ? "font-bold text-primary text-xs md:text-base hidden md:block"
              : "text-muted-foreground text-xs md:text-base hidden md:block"
          }
        >
          Contas
        </Link>
        <Link
          href="/crypto"
          className={
            pathname === "/crypto"
              ? "font-bold text-primary text-xs md:text-base hidden lg:block"
              : "text-muted-foreground text-xs md:text-base hidden lg:block"
          }
        >
          Crypto
        </Link>
      </div>
      {/* Direita */}
      <UserButton showName />
    </nav>
  );
};

export default Navbar;
