"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
  const circles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Animated circles */}
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3, 0.3],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAyIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPgo8L2c+CjwvZz4KPHN2Zz4=')] opacity-40" />

      {/* Nutritional icons pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            style={{
              left: `${(i * 23 + 10) % 90}%`,
              top: `${(i * 17 + 15) % 80}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="opacity-30"
            >
              {i % 4 === 0 && (
                // Apple icon
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5Z" />
              )}
              {i % 4 === 1 && (
                // Heart icon
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              )}
              {i % 4 === 2 && (
                // Activity icon
                <path d="M22,12H18L15,21L9,3L6,12H2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {i % 4 === 3 && (
                // Leaf icon
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              )}
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  )
}