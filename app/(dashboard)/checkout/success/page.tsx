"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const payment_id = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const external_reference = searchParams.get("external_reference");

    // Datos básicos de la URL
    const basicData = {
      payment_id,
      status,
      external_reference,
    };

    setPaymentData(basicData);

    // Si tenemos payment_id, consultar detalles completos
    if (payment_id) {
      fetchPaymentDetails(payment_id);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/mercadopago/check-payment?payment_id=${paymentId}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Detalles completos del pago:", data.payment);

        // Actualizar con información detallada
        setPaymentData(prev => ({
          ...prev,
          ...data.payment,
          detailsLoaded: true
        }));
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            ¡Pago Exitoso!
          </CardTitle>
          <CardDescription>
            Tu pago ha sido procesado correctamente
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
            Tu suscripción ha sido activada exitosamente. Ya puedes comenzar a usar todas las funcionalidades de tu plan.
          </p>

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