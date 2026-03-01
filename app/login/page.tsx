import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();
  if (userId) {
    redirect("/");
  }
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2">
      {/*Esquerda */}
      <div className="flex h-full flex-col justify-center p-6 md:p-8 max-w-[550px] mx-auto w-full">
        <Image
          src="/logo.svg"
          width={173}
          height={40}
          alt="Finance Hub Logo"
          className="mb-8 pl-1"
        />
        <h1 className="text-2xl md:text-4xl font-bold mb-3">Bem Vindo!</h1>
        <p className="text-sm md:text-base text-muted-foreground mb-8">
          A Finance Hub é uma plataforma de gestão financeira inteligente para
          monitorar suas movimentações, oferecer insights personalizados,
          mostrar a cotação de suas criptomoedas, te avisar de contas a vencer e
          muito mais!
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      {/*Direita */}
      <div className="relative h-full w-full hidden lg:block">
        <Image
          src="/login.webp"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
