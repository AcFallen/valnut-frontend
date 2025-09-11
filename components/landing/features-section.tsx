"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import * as Icons from "lucide-react"

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeaturesSectionProps {
  title: string
  subtitle: string
  items: Feature[]
}

export function FeaturesSection({ title, subtitle, items }: FeaturesSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
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
          {items.map((feature, index) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as LucideIcon
            
            return (
              <motion.div
                key={index}
           
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                >
                  <IconComponent className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="mt-6 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Decorative elements */}
        <div className="relative mt-20">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Todo esto en una sola plataforma?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Sí, Valnut integra todas las herramientas que necesitas para llevar tu práctica nutricional al siguiente nivel.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Ver todas las funcionalidades
              <Icons.ArrowRight className="ml-2 w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}