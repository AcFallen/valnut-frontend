import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Tiempo de cache por defecto: 5 minutos
        staleTime: 1000 * 60 * 5,
        // Tiempo de cache en segundo plano: 10 minutos
        gcTime: 1000 * 60 * 10,
        // Reintentar hasta 3 veces en caso de error
        retry: 3,
        // Intervalo de reintento exponencial
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Refetch automático cuando la ventana vuelve a tener foco
        refetchOnWindowFocus: true,
        // Refetch cuando se reconecta
        refetchOnReconnect: true,
        // No refetch automático en el mount si los datos están frescos
        refetchOnMount: true,
      },
      mutations: {
        // Reintentar mutaciones fallidas hasta 2 veces
        retry: 2,
        // Tiempo de espera entre reintentos
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      },
    },
  })
}