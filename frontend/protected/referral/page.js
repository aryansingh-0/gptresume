'use client';

import React from 'react';
import { Copy, Gift, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function ReferralPage() {
  const { user } = useAuth();

  const referralLink = user?.username ?
    `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/auth/signup?ref=${user.username}` :
    'Loading...';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen   sm:p-8">
      <div className="w-full max-w-2xl p-2 sm:p-8  text-center ">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
          Invite & Earn Credits
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-8">
          Share your unique link and unlock rewards for you and your friends.
        </p>

        {/* Link and Copy Button */}
        <div className="relative mb-8 group">
          <div className="flex items-center justify-between bg-muted rounded-xl p-3 sm:p-4 border border-border">
            <span className="font-mono text-sm sm:text-base text-muted-foreground truncate pr-4">
              {referralLink}
            </span>
            <button
              onClick={handleCopy}
              className="btn btn-primary flex items-center gap-2"
            >
              <Copy size={15} /> 
            </button>
          </div>
        </div>

        {/* Reward Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="card p-6 border border-green-500/20 shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-green-500">
            <Gift className="text-green-500 mb-3" size={48} />
            <h3 className="text-2xl font-bold text-foreground">+50 Credits</h3>
            <p className="text-muted-foreground text-sm mt-1">
              For every friend who signs up with your link.
            </p>
          </div>
          <div className="card p-6 border border-primary-500/20 shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-primary-500">
            <Users className="text-primary-500 mb-3" size={48} />
            <h3 className="text-2xl font-bold text-foreground">+20 Credits</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Your friend gets an instant bonus to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}