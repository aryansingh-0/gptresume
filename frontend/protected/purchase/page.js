'use client';

import React, { useState, useEffect } from "react";
import Script from "next/script";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Copy, Gift, Users, Clock, ShoppingBag } from "lucide-react";
import PlanCard from "@/components/purchase/PlanCard";
import PaymentHist from "@/components/purchase/PaymentHist";
import Referral from "@/components/purchase/Referral"

export default function PurchasePage() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [userData, setUserData] = useState(null);
  const { user, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState("buy"); // 'buy', 'history', 'referral'

  const referralLink = user?.username
    ? `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/auth/signup?ref=${user.username}`
    : "Loading...";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  useEffect(() => {
    if (user?._id) setUserData(user);
  }, [user]);

  const handlePayment = async (planKey) => {
    if (!user?._id) {
      toast.error("Please login to purchase credits.");
      return;
    }

    try {
      setLoadingPlan(planKey);
      const orderRes = await api.post("/payment/create-order", { plan: planKey });
      const { order } = orderRes;
      if (!order) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Gpt Resume",
        description: `${planKey.toUpperCase()} Credits Purchase`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await api.post("/payment/verify-payment", {
              ...response,
              userId: user._id,
              plan: planKey,
            });
            if (verifyRes.success) {
              toast.success(verifyRes.message);
              checkAuth();
              setUserData(user);
            } else toast.error("Payment verification failed.");
          } catch (err) {
            console.error(err);
            toast.error("Verification error. Try again.");
          }
        },
        theme: { color: "#6366f1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Payment failed. Try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const creditPlans = [
    { key: "basic", title: "Basic Pack", price: 20, originalPrice: 30, credits: 30 },
    { key: "standard", title: "Standard Pack", price: 40, originalPrice: 80, credits: 100, highlight: true },
    { key: "premium", title: "Premium Pack", price: 100, originalPrice: 200, credits: 250 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 transition-colors duration-300">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {/* Tab Buttons */}
      {/* Tab Content Wrapper */}
<div className="relative w-full max-w-5xl overflow-hidden">
  <div
    className={`flex transition-transform duration-500 ease-in-out`}
    style={{
      transform:
        activeTab === "buy"
          ? "translateX(0%)"
          : activeTab === "history"
          ? "translateX(-100%)"
          : "translateX(-200%)",
    }}
  >
    {/* BUY TAB */}
    <div className="w-full flex-shrink-0 px-4">
      <div className="flex flex-col items-center">
        <div className="mb-8 p-4 rounded-xl border border-border bg-card shadow-sm w-full max-w-sm text-center">
          <p className="text-lg">
            Your Credits:{" "}
            <span className="font-semibold text-primary text-xl">
              {userData?.credits || 0}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {creditPlans.map((plan) => (
            <PlanCard
              key={plan.key}
              title={plan.title}
              price={plan.price}
              highlight={plan.highlight}
              type="Credit"
              originalPrice={plan.originalPrice}
              credits={plan.credits}
              loading={loadingPlan === plan.key}
              onPurchase={() => handlePayment(plan.key)}
            />
          ))}
        </div>
      </div>
    </div>

    {/* HISTORY TAB */}
    <div className="w-full flex-shrink-0 px-4">
      <PaymentHist payments={user?.payments || []} />
    </div>

    {/* REFERRAL TAB */}
    <div className="w-full flex-shrink-0 px-4">
      <Referral />
    </div>
  </div>
</div>


      {/* TAB 1 — BUY CREDITS */}
      {activeTab === "buy" && (
        <div className="w-full max-w-5xl flex flex-col items-center animate-fade-in">
          <div className="mb-8 p-4 rounded-xl border border-border bg-card shadow-sm w-full max-w-sm text-center">
            <p className="text-lg">
              Your Credits:{" "}
              <span className="font-semibold text-primary text-xl">
                {userData?.credits || 0}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {creditPlans.map((plan) => (
              <PlanCard
                key={plan.key}
                title={plan.title}
                price={plan.price}
                highlight={plan.highlight}
                type="Credit"
                originalPrice={plan.originalPrice}
                credits={plan.credits}
                loading={loadingPlan === plan.key}
                onPurchase={() => handlePayment(plan.key)}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2 — HISTORY */}
      {activeTab === "history" && (
        <div className="w-full max-w-5xl animate-fade-in">
          <PaymentHist payments={user?.payments || []} />
        </div>
      )}

      {/* TAB 3 — REFERRAL */}
      {activeTab === "referral" && (
        <Referral/>
      )}
    </div>
  );
}
