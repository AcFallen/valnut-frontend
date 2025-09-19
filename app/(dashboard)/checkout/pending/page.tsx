"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PendingPage() {
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
            <Clock className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-yellow-600">
            Pago Pendiente
          </CardTitle>
          <CardDescription>
            Tu pago está siendo procesado
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {paymentData && (
            <div className="bg-muted p-4 rounded-lg text-left">
              <h3 className="font-medium mb-2">Detalles del pago:</h3>
              <div className="space-y-1 text-sm">
                <p><strong>ID de Pago:</strong> {paymentData.payment_id}</p>
                <p><strong>Estado:</strong> {paymentData.status}</p>
                <p><strong>Referencia:</strong> {paymentData.external_reference}</p>
              </div>
            </div>
          )}

          <p className="text-muted-foreground">
            Tu pago está siendo verificado. Esto puede tomar unos minutos. Te notificaremos por email cuando el pago sea confirmado.
          </p>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>¿Qué sigue?</strong><br />
              • Recibirás una confirmación por email<br />
              • Tu suscripción se activará automáticamente<br />
              • Puedes continuar usando la aplicación
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link href="/dashboard">
                Ir al Dashboard
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/checkout">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Planes
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}