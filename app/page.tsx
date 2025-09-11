"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTASection } from "@/components/landing/cta-section";

import landingContent from "@/data/landing-content.json";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <HeroSection {...landingContent.hero} />
      <FeaturesSection {...landingContent.features} />
      <TestimonialsSection {...landingContent.testimonials} />
      <PricingSection {...landingContent.pricing} />
      <CTASection {...landingContent.cta} />
    </div>
  );
}
