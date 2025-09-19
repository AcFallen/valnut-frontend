import { MercadoPagoConfig, Preference } from 'mercadopago';

console.log("Initializing MercadoPago...");
console.log("MP_ACCESS_TOKEN exists:", !!process.env.MP_ACCESS_TOKEN);

if (!process.env.MP_ACCESS_TOKEN) {
  console.error('MP_ACCESS_TOKEN environment variable is missing');
  throw new Error('MP_ACCESS_TOKEN environment variable is required');
}

// Configura el cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    timeout: 5000,
  }
});

export const preference = new Preference(client);
console.log("MercadoPago initialized successfully");