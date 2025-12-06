'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import PricingCard from '@/components/purchase/PricingCard';
import BackgroundImage from '@/components/BackgroundImage';
export default function PricingPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const creditPlans = [
      {
        key: 'free',
        title: 'Free Plan',
        price: 0,
        credits: 10,
        buttonText: 'Get Started',
        href: user
          ? '/protected/dashboard'
          : '/auth/signup?redirect=/protected/dashboard',
      },
      {
        key: 'basic',
        title: 'Basic Pack',
        price: 20,
        originalPrice: 30,
        credits: 30,
        buttonText: 'Buy Now',
        href: user
          ? '/protected/purchase?credits=basic'
          : '/auth/signup?redirect=/protected/purchase?credits=basic',
      },
      {
        key: 'standard',
        title: 'Standard Pack',
        price: 40,
        originalPrice: 80,
        credits: 100,
        highlight: true,
        buttonText: 'Buy Now',
        href: user
          ? '/protected/purchase?credits=standard'
          : '/auth/signup?redirect=/protected/purchase?credits=standard',
      },
      {
        key: 'premium',
        title: 'Premium Pack',
        price: 100,
        originalPrice: 200,
        credits: 250,
        buttonText: 'Buy Now',
        href: user
          ? '/protected/purchase?credits=premium'
          : '/auth/signup?redirect=/protected/purchase?credits=premium',
      },
    ];

    setPlans(creditPlans);
  }, [user]);

  return (
    <div className="min-h-screen relative flex flex-col items-center  text-foreground px-4 transition-colors duration-300 py-20">


      <div className="max-w-6xl relative w-full text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Choose Your Plan</h1>
        <p className="text-xl  max-w-2xl mx-auto">
          Purchase credit packs for generating AI-tailored resumes.
        </p>
      </div>
      <BackgroundImage />

      <div className="grid md:grid-cols-4 gap-8 w-full max-w-6xl">
        {plans.map((plan) => (
          <PricingCard
            key={plan.key}
            title={plan.title}
            price={plan.price}
            originalPrice={plan.originalPrice}
            credits={plan.credits}
            href={plan.href}
            buttonText={plan.buttonText}
            highlight={plan.highlight || false}
          />
        ))}
      </div>
    </div>
  );
}
