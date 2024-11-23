interface EmailTemplateProps {
  firstName: string;
  billName: string;
  amount: string;
  dueDate: string;
}

export const EmailTemplate = ({
  firstName,
  billName,
  amount,
  dueDate,
}: EmailTemplateProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={{ color: "#4CAF50" }}>Lembrete de Conta a Vencer</h2>
      <p>Olá {firstName},</p>
      <p>
        Sua conta <strong>{billName}</strong> no valor de{" "}
        <strong>R${amount}</strong> vence em <strong>{dueDate}</strong>.
      </p>
      <p>
        Por favor, certifique-se de realizar o pagamento a tempo para evitar
        multas.
      </p>
      <p>Atenciosamente,</p>
      <p>
        <strong>Finance Hub</strong>
      </p>
    </div>
  );
};
