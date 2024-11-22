import { BillCategory, BillPaymentMethod, BillStatus } from "@prisma/client";

export const BILL_PAYMENT_METHOD_ICONS = {
  [BillPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [BillPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [BillPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [BillPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [BillPaymentMethod.CASH]: "money.svg",
  [BillPaymentMethod.PIX]: "pix.svg",
  [BillPaymentMethod.OTHER]: "other.svg",
};

export const BILL_CATEGORY_LABELS = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};

export const BILL_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const BILL_STATUS_OPTIONS = [
  {
    value: BillStatus.PAID,
    label: "Paga",
  },
  {
    value: BillStatus.PAYABLE,
    label: "Aberta",
  },
  {
    value: BillStatus.EXPIRED,
    label: "Vencida",
  },
];

export const BILL_PAYMENT_METHOD_OPTIONS = [
  {
    value: BillPaymentMethod.BANK_TRANSFER,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.BANK_TRANSFER],
  },
  {
    value: BillPaymentMethod.BANK_SLIP,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.BANK_SLIP],
  },
  {
    value: BillPaymentMethod.CASH,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.CASH],
  },
  {
    value: BillPaymentMethod.CREDIT_CARD,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.CREDIT_CARD],
  },
  {
    value: BillPaymentMethod.DEBIT_CARD,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.DEBIT_CARD],
  },
  {
    value: BillPaymentMethod.OTHER,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.OTHER],
  },
  {
    value: BillPaymentMethod.PIX,
    label: BILL_PAYMENT_METHOD_LABELS[BillPaymentMethod.PIX],
  },
];

export const BILL_CATEGORY_OPTIONS = [
  {
    value: BillCategory.EDUCATION,
    label: BILL_CATEGORY_LABELS[BillCategory.EDUCATION],
  },
  {
    value: BillCategory.ENTERTAINMENT,
    label: BILL_CATEGORY_LABELS[BillCategory.ENTERTAINMENT],
  },
  {
    value: BillCategory.FOOD,
    label: BILL_CATEGORY_LABELS[BillCategory.FOOD],
  },
  {
    value: BillCategory.HEALTH,
    label: BILL_CATEGORY_LABELS[BillCategory.HEALTH],
  },
  {
    value: BillCategory.HOUSING,
    label: BILL_CATEGORY_LABELS[BillCategory.HOUSING],
  },
  {
    value: BillCategory.OTHER,
    label: BILL_CATEGORY_LABELS[BillCategory.OTHER],
  },
  {
    value: BillCategory.SALARY,
    label: BILL_CATEGORY_LABELS[BillCategory.SALARY],
  },
  {
    value: BillCategory.TRANSPORTATION,
    label: BILL_CATEGORY_LABELS[BillCategory.TRANSPORTATION],
  },
  {
    value: BillCategory.UTILITY,
    label: BILL_CATEGORY_LABELS[BillCategory.UTILITY],
  },
];
