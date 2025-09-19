import { NextRequest, NextResponse } from "next/server";

// Endpoint para simular webhooks de MercadoPago en desarrollo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payment_id, status, external_reference } = body;

    console.log("=== WEBHOOK SIMULADO ===");
    console.log("Payment ID:", payment_id);
    console.log("Status:", status);
    console.log("External Reference:", external_reference);

    // Aquí puedes agregar la lógica que quieres probar
    // Por ejemplo: actualizar base de datos, enviar emails, etc.

    if (status === "approved") {
      console.log("✅ Pago aprobado - Activar suscripción");
      // TODO: Activar suscripción del usuario
    } else if (status === "rejected") {
      console.log("❌ Pago rechazado - Mantener estado anterior");
      // TODO: Manejar pago rechazado
    } else if (status === "pending") {
      console.log("⏳ Pago pendiente - Esperar confirmación");
      // TODO: Marcar como pendiente
    }

    return NextResponse.json({
      received: true,
      processed: true,
      action: `Processed ${status} payment ${payment_id}`
    });

  } catch (error) {
    console.error("Error in test webhook:", error);
    return NextResponse.json(
      { error: "Error processing test webhook" },
      { status: 500 }
    );
  }
}

// También permitir GET para testing rápido
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Simular datos de ejemplo
  const testData = {
    payment_id: searchParams.get("payment_id") || "123456789",
    status: searchParams.get("status") || "approved",
    external_reference: searchParams.get("external_reference") || `order_${Date.now()}`
  };

  console.log("=== WEBHOOK TEST (GET) ===");
  console.log("Test Data:", testData);

  return NextResponse.json({
    message: "Webhook test endpoint",
    testData,
    usage: "POST with payment data or GET with query params"
  });
}