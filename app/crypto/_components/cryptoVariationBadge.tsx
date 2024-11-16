import { Badge } from "@/app/_components/ui/badge";
import { CircleIcon } from "lucide-react";

interface CryptoVariationBadgeProps {
  variation: number | null; // Variação percentual em 24h
}

const CryptoVariationBadge = ({ variation }: CryptoVariationBadgeProps) => {
  if (variation !== null && variation > 0) {
    return (
      <Badge className="font bold bg-main bg-opacity-10 text-main hover:bg-muted">
        <CircleIcon className="mr-2 fill-main" size={10} />+
        {variation.toFixed(2)}%
      </Badge>
    );
  }

  if (variation !== null && variation < 0) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        {variation.toFixed(2)}%
      </Badge>
    );
  }

  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Sem variação
    </Badge>
  );
};

export default CryptoVariationBadge;
