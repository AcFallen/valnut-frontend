import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log para debugging (remover en producción)
    console.log("MercadoPago Webhook received:", body);

    // Verificar que sea una notificación de pago
    if (body.type === "payment") {
      const paymentId = body.data?.id;

      if (paymentId) {
        // Aquí puedes hacer una consulta a la API de MercadoPago para obtener los detalles del pago
        // y actualizar el estado en tu base de datos

        console.log(`Payment ID received: ${paymentId}`);

        // TODO: Implementar lógica para:
        // 1. Consultar el estado del pago en MercadoPago
        // 2. Actualizar el estado de la suscripción en la base de datos
        // 3. Enviar notificaciones al usuario si es necesario

        return NextResponse.json({ received: true });
      }
    }

    // Para otros tipos de notificaciones
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    );
  }
}

// MercadoPago también puede enviar notificaciones por GET
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const topic = searchParams.get("topic");

  console.log("MercadoPago GET notification:", { id, topic });

  // Log para debugging (remover en producción)
  if (topic === "payment" && id) {
    console.log(`Payment notification received for ID: ${id}`);

    // TODO: Implementar lógica similar al POST
  }

  return NextResponse.json({ received: true });
}