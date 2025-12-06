'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AddBasicInfo from '@/components/profile/AddBasicInfo';
import AddExperience from '@/components/profile/AddExperience';
import AddEducation from '@/components/profile/AddEducation';
import AddSkills from '@/components/profile/AddSkills';
import AddProject from '@/components/profile/AddProject';
import AddCertificate from '@/components/profile/AddCertificate';
import { useAuth } from '@/lib/auth';
import profileSteps from './profileSteps.json'; // JSON file defining steps

export default function CompleteProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && profile) {
      setUserProfile(profile);
    }
  }, [profile, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  // Map component names from JSON to actual React components
  const StepComponentMap = {
    AddBasicInfo,
    AddExperience,
    AddEducation,
    AddSkills,
    AddProject,
    AddCertificate
  };

  const step = profileSteps[currentStep];
  const StepComponent = StepComponentMap[step.component];

  const handleNext = () => {
    if (currentStep + 1 < profileSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // All steps complete, navigate to dashboard
      router.push('/protected/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="   md:py-10 md:px-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{step.title}</h1>
        <p className="text-muted-foreground mt-2">
          {`Step ${currentStep + 1} of ${profileSteps.length}`}
        </p>
      </div>

      {/* Step Component */}
      <StepComponent
        profile={userProfile}
        setProfile={setUserProfile}
        onNext={handleNext}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`btn btn-outline ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="btn btn-primary"
        >
          {currentStep + 1 === profileSteps.length ? 'Finish' : 'Next'}
        </button>
      </div>

      {/* Optional: Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${((currentStep + 1) / profileSteps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
