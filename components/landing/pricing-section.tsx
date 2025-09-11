"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingSectionProps {
  title: string;
  subtitle: string;
  plans: Plan[];
}

export function PricingSection({
  title,
  subtitle,
  plans,
}: PricingSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                plan.popular
                  ? "ring-2 ring-primary shadow-2xl transform scale-105"
                  : "hover:shadow-2xl"
              } transition-all duration-300`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-3 font-semibold"
                >
                  <Star className="inline-block w-4 h-4 mr-2" />
                  Más Popular
                </motion.div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      /{plan.period}
                    </span>
                  </div>
                </motion.div>

                <motion.ul
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * featureIndex }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full font-semibold py-6 text-lg ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 shadow-lg"
                        : "hover:bg-primary hover:text-white border-2 border-primary text-primary"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional pricing info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Todos los planes incluyen migración de datos gratuita y soporte
            personalizado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🔒", text: "Datos seguros y encriptados" },
              { icon: "☁️", text: "Respaldo automático en la nube" },
              { icon: "📱", text: "Acceso desde cualquier dispositivo" },
              { icon: "🆘", text: "Soporte técnico incluido" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
