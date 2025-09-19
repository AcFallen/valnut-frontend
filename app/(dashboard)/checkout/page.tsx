"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Plan Básico",
    price: 99.99,
    currency: "PEN",
    description: "Perfecto para profesionales que están comenzando",
    features: [
      "Hasta 50 pacientes",
      "Gestión básica de citas",
      "Reportes básicos",
      "Soporte por email"
    ]
  },
  {
    id: "professional",
    name: "Plan Profesional",
    price: 149.99,
    currency: "PEN",
    description: "Ideal para consultorios establecidos",
    features: [
      "Hasta 200 pacientes",
      "Gestión avanzada de citas",
      "Reportes completos",
      "Planes nutricionales",
      "Soporte prioritario"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Plan Empresarial",
    price: 299.99,
    currency: "PEN",
    description: "Para clínicas y consultorios grandes",
    features: [
      "Pacientes ilimitados",
      "Múltiples usuarios",
      "Reportes avanzados",
      "API personalizada",
      "Soporte 24/7"
    ]
  }
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSelectPlan = async (plan: Plan) => {
    setLoading(plan.id);

    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: plan.name,
          quantity: 1,
          unit_price: plan.price,
          currency_id: plan.currency,
          description: plan.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la preferencia de pago");
      }

      const data = await response.json();

      // Redirigir a MercadoPago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió el enlace de pago");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar el pago. Inténtalo de nuevo.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Planes de Suscripción</h1>
        <p className="text-muted-foreground">
          Elige el plan que mejor se adapte a las necesidades de tu consultorio
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                Más Popular
              </Badge>
            )}

            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="text-3xl font-bold">
                S/ {plan.price}
                <span className="text-lg font-normal text-muted-foreground">
                  /mes
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan)}
                disabled={loading !== null}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Seleccionar Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}