import { Badge } from "@/app/_components/ui/badge";
import { Bills, BillStatus } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface BillStatusBadgeProps {
  bill: Bills;
}

const BillStatusBadge = ({ bill }: BillStatusBadgeProps) => {
  if (bill.status === BillStatus.PAID) {
    return (
      <Badge className="font bold bg-main bg-opacity-10 text-main hover:bg-muted">
        <CircleIcon className="mr-2 fill-main" size={10} />
        Pago
      </Badge>
    );
  }
  if (bill.status === BillStatus.EXPIRED) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Vencido
      </Badge>
    );
  }
  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Aberto
    </Badge>
  );
};

export default BillStatusBadge;
