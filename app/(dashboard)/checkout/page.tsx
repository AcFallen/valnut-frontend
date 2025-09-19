"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CreditCard, Loader2, Sparkles, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { membershipService } from "@/services/membership.service";
import { Membership } from "@/types/membership";

const getFeaturesList = (membership: Membership): string[] => {
  const features = [];

  if (membership.maxPatients > 0) {
    features.push(`Hasta ${membership.maxPatients} pacientes`);
  } else {
    features.push("Pacientes ilimitados");
  }

  if (membership.maxUsers > 1) {
    features.push(`Hasta ${membership.maxUsers} usuarios`);
  }

  if (membership.features.patientManagement) {
    features.push("Gestión de pacientes");
  }

  if (membership.features.appointmentScheduling) {
    features.push("Programación de citas");
  }

  if (membership.features.mealPlans) {
    features.push("Planes nutricionales");
  }

  if (membership.features.basicReports) {
    features.push("Reportes básicos");
  }

  if (membership.features.advancedReports) {
    features.push("Reportes avanzados");
  }

  if (membership.features.apiAccess) {
    features.push("Acceso a API");
  }

  return features;
};

const isPopularPlan = (membership: Membership): boolean => {
  return membership.name.toLowerCase().includes("profesional");
};

export default function CheckoutPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );

  const {
    data: membershipsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: membershipService.getMemberships,
  });

  const allMemberships =
    membershipsResponse?.data?.filter((m) => m.isActive) || [];

  const filteredMemberships = allMemberships.filter((membership) => {
    if (billingPeriod === "monthly") {
      return membership.durationMonths === 1;
    } else {
      return membership.durationMonths === 12;
    }
  });

  const handleSelectPlan = async (membership: Membership) => {
    setLoading(membership.id);

    try {
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `${membership.name} - ${
            membership.durationMonths === 12 ? "Anual" : "Mensual"
          }`,
          quantity: 1,
          unit_price: parseFloat(membership.price),
          currency_id: "PEN",
          description: membership.description,
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
    <div>
      <div>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Planes Premium para Profesionales
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-400">
            Planes de Suscripción
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu
            consultorio y lleva tu práctica al siguiente nivel
          </p>
        </div>

        {/* Billing Period Tabs */}
        <div className="max-w-md mx-auto mb-12">
          <Tabs
            value={billingPeriod}
            onValueChange={(value) =>
              setBillingPeriod(value as "monthly" | "annual")
            }
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="monthly" className="text-base font-medium">
                Mensual
              </TabsTrigger>
              <TabsTrigger value="annual" className="text-base font-medium">
                <div className="flex items-center gap-2">
                  Anual
                  {allMemberships.some(
                    (m) => m.durationMonths === 12 && m.isActive
                  ) && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      AHORRO
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Loading/Error States */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-pulse"></div>
              <Loader2 className="h-8 w-8 animate-spin text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="mt-4 text-lg text-muted-foreground">
              Cargando planes...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Error al cargar los planes
            </h3>
            <p className="text-muted-foreground mb-6">
              Hubo un problema al conectar con nuestros servidores
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              <Loader2 className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </div>
        ) : filteredMemberships.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No hay planes{" "}
              {billingPeriod === "annual" ? "anuales" : "mensuales"} disponibles
            </h3>
            <p className="text-muted-foreground mb-6">
              {billingPeriod === "annual"
                ? "Prueba seleccionando los planes mensuales"
                : "Prueba seleccionando los planes anuales"}
            </p>
            <Button
              onClick={() =>
                setBillingPeriod(
                  billingPeriod === "annual" ? "monthly" : "annual"
                )
              }
              variant="outline"
            >
              Ver planes {billingPeriod === "annual" ? "mensuales" : "anuales"}
            </Button>
          </div>
        ) : (
          /* Plans Grid */
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredMemberships.map((membership) => {
              const popular = isPopularPlan(membership);
              const features = getFeaturesList(membership);
              const currentPrice = parseFloat(membership.price);

              return (
                <Card
                  key={membership.id}
                  className={`relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden ${
                    popular
                      ? "border-primary bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20"
                      : "bg-white/70 backdrop-blur-sm dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 dark:to-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardHeader className="relative z-10 pb-4">
                    <CardTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {membership.name}
                      {popular && <Zap className="h-5 w-5 text-primary" />}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {membership.description}
                    </CardDescription>

                    {/* Pricing */}
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">
                          S/ {currentPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-muted-foreground">
                          /{membership.durationMonths === 12 ? "año" : "mes"}
                        </span>
                      </div>

                      {membership.durationMonths === 12 && (
                        <div className="mt-2">
                          <span className="text-sm text-green-600 font-medium">
                            💰 Ahorro con plan anual
                          </span>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    {/* Features List */}
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                        popular
                          ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl"
                          : "hover:shadow-lg"
                      }`}
                      variant={popular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(membership)}
                      disabled={loading !== null}
                    >
                      {loading === membership.id ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-5 w-5" />
                          Seleccionar Plan
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
