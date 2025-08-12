import { AlertTriangle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return (
    <div className="bg-background flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="text-destructive h-10 w-10" />
          <CardTitle className="text-destructive text-center">
            Pagamento não realizado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-center">
            Ocorreu um erro ao processar seu pagamento.
            <br />
            Nenhuma cobrança foi efetuada.
            <br />
            Por favor, tente novamente ou escolha outro método de pagamento.
          </p>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link href="/cart/identification">Voltar ao carrinho</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
