"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function FailurePage() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const payment_id = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const external_reference = searchParams.get("external_reference");

    setPaymentData({
      payment_id,
      status,
      external_reference,
    });
  }, [searchParams]);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Pago No Procesado
          </CardTitle>
          <CardDescription>
            Hubo un problema al procesar tu pago
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {paymentData && (
            <div className="bg-muted p-4 rounded-lg text-left">
              <h3 className="font-medium mb-2">Detalles del intento:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>ID de Pago:</strong> {paymentData.payment_id || "N/A"}</p>
                <p><strong>Estado:</strong> {paymentData.status}</p>
                <p><strong>Referencia:</strong> {paymentData.external_reference}</p>
              </div>
            </div>
          )}

          <p className="text-muted-foreground">
            No se pudo procesar tu pago. Esto puede deberse a fondos insuficientes, problemas con la tarjeta o el banco. Puedes intentar nuevamente con otro método de pago.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link href="/checkout">
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar Nuevamente
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}