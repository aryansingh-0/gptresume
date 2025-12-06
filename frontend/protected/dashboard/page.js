'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, User, CreditCard, TrendingUp, ArrowRight } from "lucide-react";
import api from "../../../lib/api";
import VerifyEmail from "@/components/alert/VerifyEmail";
import { useAuth } from '@/lib/auth';

import  BackgroundImage from '@/components/BackgroundImage'
// Skeleton Loader Component
const DashboardSkeleton = () => {
  return (
    <div className="space-y-8  animate-pulse">
      {/* Heading Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-64"></div>
        <div className="h-4 bg-muted rounded w-96"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-muted rounded-lg"></div>
              <div className="ml-4 space-y-2">
                <div className="h-4 bg-muted rounded w-28"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid md:grid-cols-2 gap-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card p-8 space-y-4">
            <div className="h-6 bg-muted rounded w-48"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-10 bg-primary rounded-lg w-48"></div>
          </div>
        ))}
      </div>

      {/* Recent Resumes Skeleton */}
      <div className="card p-8 space-y-4">
        <div className="h-6 bg-muted rounded w-56"></div>
        <div className="space-y-4 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-48"></div>
                <div className="h-4 bg-muted rounded w-36"></div>
              </div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Page Component
export default function DashboardPage() { 
  
  
  const {user,stats,loading}=useAuth()
 
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 relative">
      {/* Main Heading Section */} 
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s your overview.</p>
      </div>
 
 
 
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
              <p className="text-2xl font-bold text-foreground">{stats?.totalResumes || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 " />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Credits Remaining</p>
              <p className="text-2xl font-bold text-foreground">{stats?.credits || 0}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10  rounded-lg flex items-center justify-center">
              <User className="w-6 h-6  " />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Profile Complete</p>
              <p className="text-2xl font-bold text-foreground">{stats?.profileCompleteness || 0}%</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10  rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 " />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold text-foreground">{stats?.resumesThisMonth || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Generate</h2>
          <p className="text-muted-foreground mb-6">
            Paste a job description and get a tailored resume in seconds.
          </p>
          <Link href="/protected/resume/builder" className="btn btn-primary">
            Start Building Resume
          </Link>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Complete Your Profile</h2>
          <p className="text-muted-foreground mb-6">
            {stats?.profileCompleteness >= 80 ?
              "Your profile looks great! Keep it updated for better results." :
              "Add more details to your profile for better AI-generated resumes."
            }
          </p>
          <Link href="/protected/profile" className="btn btn-outline">
            Update Profile
          </Link>
        </div>
      </div>

      {/* Recent Resumes */}
      {/* {stats?.recentResumes?.length > 0 &&
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Recent Resumes</h2>
          <div className="space-y-4">
            {stats.recentResumes.map((resume) => (
              <div key={resume._id} className="flex items-center justify-between card p-4">
                <div>
                  <h3 className="font-medium text-foreground">{resume.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link href={`/protected/resume/${resume._id}`} className="text-primary hover:text-primary-foreground">
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/protected/resume/history" className="text-primary hover:text-primary-foreground flex items-center gap-1">
              View All Resumes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      } */}
    </div>
  );
}