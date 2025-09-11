"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  location: string
  content: string
  rating: number
}

interface TestimonialsSectionProps {
  title: string
  subtitle: string
  items: Testimonial[]
}

export function TestimonialsSection({ title, subtitle, items }: TestimonialsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const generateAvatar = (name: string) => {
    const colors = [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
    ]
    const colorIndex = name.length % colors.length
    return colors[colorIndex]
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
        
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative quote */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-4 right-4 text-primary/20"
              >
                <Quote size={40} />
              </motion.div>

              {/* Rating stars */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex mb-6"
              >
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial content */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg relative z-10"
              >
                "{testimonial.content}"
              </motion.p>

              {/* Author info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`w-12 h-12 rounded-full ${generateAvatar(testimonial.name)} flex items-center justify-center text-white font-bold mr-4`}
                >
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>

              {/* Decorative gradient border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Únete a la comunidad de nutricionistas más grande de Latinoamérica
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "4.9/5", label: "Calificación promedio" },
              { metric: "95%", label: "Recomiendan Valnut" },
              { metric: "500+", label: "Profesionales activos" },
              { metric: "15 países", label: "En Latinoamérica" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.metric}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}