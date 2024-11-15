// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void; // Tornando onSearch opcional
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch = () => {}, // Valor padrão como uma função vazia
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 rounded-full px-4"
      />
      <Button
        onClick={handleSearch}
        variant="outline"
        className="rounded-full p-2"
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
