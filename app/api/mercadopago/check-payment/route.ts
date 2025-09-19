import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("payment_id");

    if (!paymentId) {
      return NextResponse.json(
        { error: "payment_id is required" },
        { status: 400 }
      );
    }

    console.log("Checking payment status for:", paymentId);

    // Consultar estado del pago en MercadoPago
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`MercadoPago API error: ${response.status}`);
    }

    const paymentData = await response.json();

    console.log("Payment data from MercadoPago:", {
      id: paymentData.id,
      status: paymentData.status,
      status_detail: paymentData.status_detail,
      amount: paymentData.transaction_amount,
      currency: paymentData.currency_id,
      external_reference: paymentData.external_reference,
      date_created: paymentData.date_created,
      date_approved: paymentData.date_approved,
    });

    // Retornar información relevante
    return NextResponse.json({
      success: true,
      payment: {
        id: paymentData.id,
        status: paymentData.status,
        status_detail: paymentData.status_detail,
        amount: paymentData.transaction_amount,
        currency: paymentData.currency_id,
        external_reference: paymentData.external_reference,
        payment_method: paymentData.payment_method_id,
        date_created: paymentData.date_created,
        date_approved: paymentData.date_approved,
        payer_email: paymentData.payer?.email,
      }
    });

  } catch (error: any) {
    console.error("Error checking payment:", error);
    return NextResponse.json(
      {
        error: "Error checking payment status",
        details: error.message,
      },
      { status: 500 }
    );
  }
}