"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface CTAFeature {
  text: string;
}

interface CTASectionProps {
  title: string;
  subtitle: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
  features: string[];
}

export function CTASection({
  title,
  subtitle,
  description,
  button,
  features,
}: CTASectionProps) {
  const router = useRouter();
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
              {title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-white/90 mb-4"
            >
              {subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-white/80 max-w-2xl mx-auto mb-12"
            >
              {description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                variant="secondary"
                className="px-12 py-6 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-2xl"
                onClick={() => router.push(button.href)}
              >
                {button.text}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start text-white/90"
              >
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {feature.replace("✓ ", "")}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <p className="text-white/70 text-sm mb-8">
              Profesionales de la nutrición de todo el mundo confían en Valnut
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {[
                "México",
                "Argentina",
                "Colombia",
                "Chile",
                "Perú",
                "España",
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-white/60 text-sm font-medium px-4 py-2 bg-white/10 rounded-full"
                >
                  {country}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
