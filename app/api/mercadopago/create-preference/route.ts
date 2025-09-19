import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { preference } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  try {
    console.log("=== MercadoPago Create Preference API Called ===");

    // Verificar autenticación
    const session = await getServerSession(authOptions);
    console.log("Session:", session ? "authenticated" : "not authenticated");

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Request body:", body);
    const { title, quantity, unit_price, currency_id, description } = body;

    if (!title || !quantity || !unit_price || !currency_id) {
      console.log("Missing required fields:", { title, quantity, unit_price, currency_id });
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Detectar si estamos en desarrollo o producción
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Para desarrollo, usar ngrok URL si está configurada
    const publicUrl = process.env.NGROK_URL || baseUrl;

    console.log("Environment:", process.env.NODE_ENV);
    console.log("Base URL:", baseUrl);
    console.log("Public URL:", publicUrl);

    const preferenceData = {
      items: [
        {
          title,
          description,
          quantity: parseInt(quantity),
          unit_price: parseFloat(unit_price),
          currency_id,
        },
      ],
      // Configurar métodos de pago permitidos
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      // Solo incluir back_urls y auto_return si tenemos una URL pública válida
      ...(publicUrl.startsWith('https://') || !isDevelopment ? {
        back_urls: {
          success: `${publicUrl}/checkout/success`,
          failure: `${publicUrl}/checkout/failure`,
          pending: `${publicUrl}/checkout/pending`,
        },
        auto_return: "approved",
        notification_url: `${publicUrl}/api/mercadopago/webhook`,
      } : {}),
      external_reference: `order_${Date.now()}`,
      statement_descriptor: "VALNUT",
      // Configuración adicional para mejorar la experiencia de checkout
      purpose: "wallet_purchase",
      marketplace: "NONE",
    };

    console.log("Preference data:", JSON.stringify(preferenceData, null, 2));
    console.log("MP_ACCESS_TOKEN exists:", !!process.env.MP_ACCESS_TOKEN);
    console.log("Base URL:", baseUrl);

    const response = await preference.create({ body: preferenceData });
    console.log("MercadoPago response:", response);

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point,
    });
  } catch (error: any) {
    console.error("Error creating MercadoPago preference:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status
    });

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error.message || "Unknown error",
        ...(process.env.NODE_ENV === 'development' && {
          debugInfo: {
            message: error.message,
            cause: error.cause,
            response: error.response?.data
          }
        })
      },
      { status: 500 }
    );
  }
}