# Setup de MercadoPago para Valnut

## 💰 ¿Por qué no aparece la opción de "Dinero en cuenta"?

### **Razones comunes:**

1. **El usuario no tiene saldo suficiente** en su cuenta de MercadoPago
2. **Configuración de país incorrecta** - debe ser Perú (PE)
3. **Tipo de cuenta de prueba incorrecta**
4. **Configuración de métodos de pago** no especificada

### **✅ Solución implementada:**

He agregado la configuración correcta para que aparezca el saldo:

```json
{
  "payment_methods": {
    "excluded_payment_methods": [],
    "excluded_payment_types": [],
    "installments": 12,
    "default_installments": 1
  },
  "purpose": "wallet_purchase"
}
```

## 🔧 Cómo cargar saldo en cuenta de prueba

### **Opción 1: Desde el dashboard de desarrollador**
1. Ir a [developers.mercadopago.com](https://developers.mercadopago.com)
2. "Cuentas de prueba" → Seleccionar tu usuario comprador
3. "Simular depósito" o "Cargar dinero"

### **Opción 2: Transferir desde tarjeta de prueba**
1. Usar las credenciales del usuario comprador para login
2. Ir a "Cargar dinero" en la app/web de MercadoPago
3. Usar tarjeta de prueba: `4013 5406 8274 6260`

### **Opción 3: Transferencia entre cuentas de prueba**
1. Crear dos cuentas de prueba
2. Una con tarjeta, otra para recibir
3. Hacer transferencia entre ellas

## 🧪 Testing completo

### **Pasos para probar el saldo:**

1. **Crear usuario comprador correcto**:
   - País: Perú (PE)
   - Con saldo mayor al precio del plan (S/ 99.99+)

2. **Verificar en MercadoPago**:
   - Login con usuario de prueba
   - Verificar saldo disponible
   - Debe aparecer en "Mi dinero"

3. **Probar checkout**:
   - Seleccionar plan en Valnut
   - En MercadoPago debería aparecer:
     - ✅ "Dinero en cuenta" (si hay saldo)
     - ✅ Tarjetas de crédito/débito
     - ✅ Otros métodos

### **Tarjetas de prueba para Perú**:
```
Visa aprobada: 4013 5406 8274 6260
Mastercard aprobada: 5031 7557 3453 0604
CVV: cualquier 3 dígitos
Fecha: cualquier fecha futura
Nombre: cualquier nombre
```

## 🚀 Configuración rápida para testing

### **Variables de entorno mínimas:**
```env
MP_ACCESS_TOKEN=tu_access_token_de_sandbox
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_de_sandbox
```

### **Para testing con redirect automático:**
```env
MP_ACCESS_TOKEN=tu_access_token_de_sandbox
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key_de_sandbox
NGROK_URL=https://abc123.ngrok.io
```

## 🌐 Producción

### **Variables de entorno para producción:**
```env
NODE_ENV=production
NEXTAUTH_URL=https://tudominio.com
MP_ACCESS_TOKEN=tu_token_produccion
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_key_produccion
```

## 🐛 Troubleshooting

### **"No aparece dinero en cuenta"**
- ✅ Verificar saldo del usuario comprador
- ✅ Verificar país de la cuenta (debe ser PE)
- ✅ Usar credenciales de sandbox correctas
- ✅ Configuración `payment_methods` implementada

### **"Solo aparecen tarjetas"**
- Usuario no tiene saldo suficiente
- Crear depósito de prueba desde dashboard
- Verificar que la cuenta esté verificada

### **"Error al cargar saldo"**
- Usar tarjetas de prueba específicas para Perú
- Verificar que el monto sea mayor a S/ 1.00
- Intentar desde diferentes navegadores

## 📱 Apps de prueba

Para testing completo, puedes descargar las apps de MercadoPago en modo sandbox:
- **Android**: [Sandbox APK](https://developers.mercadopago.com)
- **iOS**: Configurar ambiente de desarrollo
- **Web**: `sandbox.mercadopago.com.pe`

## 💡 Tips importantes

1. **Saldo mínimo**: El usuario debe tener al menos el monto del plan + comisiones
2. **País correcto**: Todas las cuentas deben estar configuradas para Perú
3. **Verificación**: Algunas funciones requieren cuentas "verificadas" incluso en sandbox
4. **Cache**: Limpiar cookies/cache si no aparecen opciones actualizadas
5. **Tiempo**: Los depósitos de prueba pueden tardar unos minutos en aparecer