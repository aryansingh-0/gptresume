'use client';

import { useEffect, useState } from 'react'; 
import LoadingSpinner from '../../../components/LoadingSpinner';
import AddSkills from '@/components/profile/AddSkills';
import AddExperience from '@/components/profile/AddExperience';
import AddEducation from '@/components/profile/AddEducation';
import AddProject from '@/components/profile/AddProject';
import AddCertificate from '@/components/profile/AddCertificate';
import AddBasicInfo from '@/components/profile/AddBasicInfo';
import { useAuth } from '@/lib/auth'
 
export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);

  const { profile, checkProfile, profileloading } = useAuth();

  useEffect(() => {

    if (!profileloading) {

      setUserProfile(profile);
    }
  }, [profile, profileloading]);


 

  if (profileloading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>);

  }

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Profile

        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your professional information and credentials
        </p>
      </div>

     
      {/* Profile Sections */}
      <div className="space-y-6 md:space-y-8">
        {/* Basic Information */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddBasicInfo setProfile={setUserProfile} profile={userProfile} /></div>
<hr className='md:hidden'></hr>
        {/* Experience */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddExperience setProfile={setUserProfile} profile={userProfile} /></div>
<hr className='md:hidden'></hr>
        {/* Education */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddEducation setProfile={setUserProfile} profile={userProfile} /></div>
<hr className='md:hidden'></hr>
        {/* Skills */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddSkills setProfile={setUserProfile} profile={userProfile} /></div>
<hr className='md:hidden'></hr>
        {/* Projects */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddProject setProfile={setUserProfile} profile={userProfile} /></div>
<hr className='md:hidden'></hr>
        {/* Certificates */}
        <div className='rounded-xl md:bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md md:border border-[var(--color-border)]'>
        <AddCertificate setProfile={setUserProfile} profile={userProfile} /></div>
      </div>
    </div>
  );

}