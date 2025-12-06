'use client';

import { useState } from 'react';
import { Wand2, Download, Coins, Edit3, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ImprovementTips from '@/components/resume/ImprovementTips';
import PracticeFocus from '@/components/resume/PracticeFocus';
import BasicTemp from '@/template/BasicTemp';
import ModernTemp from '@/template/ModernTemp';
import ResumeEditor from '@/components/resume/ResumeEditor';
import MinimalTemp from '@/template/MinimalTemp'; 
import CoverLetter from '@/components/resume/CoverLetter'
import Image from 'next/image';
import { ArrowLeft } from "lucide-react";
import { useAuth } from '@/lib/auth';

import GlowLoader from '@/components/loading/GlowLoader'
export default function ResumeBuilderPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Template, setTemplate] = useState(() => ModernTemp);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [editMode, setEditMode] = useState(false);
  const [genresume, setGenResume] = useState(null);
  const [loading, setloading] = useState(false);
  const { profile, user, stats } = useAuth()

  const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemp, preview: '/Resume/ModernTemp.jpg' },
    { id: 'classic', name: 'Classic', component: BasicTemp, preview: '/Resume/BasicTemp.jpg' },
    { id: 'minimal', name: 'Minimal', component: MinimalTemp, preview: '/Resume/MinimalTemp.png' }
  ];

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description');
      return;
    }

    setGenerating(true);
    setGeneratedResume(null);
    setResumeId(null);
    setGenResume(null);
    setProgress(10);
    let progressValue = 10;
    let speed = 250;

    const interval = setInterval(() => {
      progressValue += 1;
      if(progressValue>60){
        speed=200;
      }
      // Cap progress at 90% until the API finishes
      if (progressValue <= 90) {
        setProgress(progressValue);
      }
    }, speed); // every 200ms → 1% step

    try {
      const response = await api.post('/resume/generate', { jobDescription, profile });

      if (!response || !response.resumeData) {
        toast.error('Invalid response from server');
        setGenerating(false);
        setProgress(0);
        return;
      }
      console.log("response aryan:", response)
      if (response.resumeData.alert) {

        toast.error("You are Not Eligible for this job")
      } else {

        toast.success('Resume generated successfully!');
      }
      setGeneratedResume(response.resumeData.resume);
      setGenResume(response.resumeData);
      setResumeId(response.resumeId || null);
      clearInterval(interval);
      setProgress(100);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to generate resume');
      clearInterval(interval);
      setProgress(0);
    } finally {
      setGenerating(false);
      setTimeout(() => setProgress(0), 1500);
    }
  };

  const handleSaveResume = async () => {
    if (!generatedResume || !resumeId) return;
    try {
      setloading(true)
      await api.post(`/resume/update/${resumeId}`, {
        title: `Resume for ${selectedTemplate} template`,
        content: generatedResume,
      });
      toast.success('Resume saved successfully!');
      setEditMode(false);
      setloading(false)
    } catch (err) {
      console.error(err);
      toast.error('Failed to save resume');
      setloading(false)
    }
  };

  const handleExport = async () => {
    toast.success("Preparing your download..")
    setloading(true)
    const content = document.getElementById("print-area")?.innerHTML;
    console.log(content)
    if (!content) return;
    const res = await fetch("https://htmltwopdf.vercel.app/generate-pdf-from-html", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: content })
    });
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${generatedResume.name}-resume.pdf`;
    link.click();
    toast.success("Download starting..")
    setloading(false)
  };


  return (
    <div className="space-y-8">

      {genresume?.alert && (
        <p className="text-red-600 bg-foreground p-2 rounded-2xl font-medium mt-2">
          {genresume.alert}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Description */}
        {generatedResume ? (
          editMode ? (
            <div className="no-print card p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Editor</h2>
              <ResumeEditor resume={generatedResume} setResume={setGeneratedResume} />
            </div>
          ) : (
            <div className="card p-6 no-print">
              <h2 className="text-xl flex gap-2 items-center font-semibold mb-4">  <button onClick={() => {
                setGeneratedResume(null);
                setResumeId(null);
                setGenResume(null);
              }} className="btn rounded-full p-3 btn-danger">
                <ArrowLeft />
              </button>Choose Template</h2>
              <div className="grid grid-cols-3 gap-4">
                {templates.map((templ) => {
                  const Com = templ.component; // Capitalized so React treats it as a component
                  return (
                    <button
                      key={templ.id}
                      onClick={() => {
                        setTemplate(() => templ.component);
                        setSelectedTemplate(templ.id);
                      }}
                      className={`p-3 rounded-lg border-2 transition-colors ${selectedTemplate === templ.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-ring'
                        }`}
                    >
                      <div className="aspect-[3/4] bg-muted rounded mb-2 border relative overflow-hidden">
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <Image
                            src={templ.preview}
                            alt="preview resume"
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                      <p className="text-sm font-medium">{templ.name}</p>
                    </button>
                  );
                })}
              </div>

            </div>
          )
        ) : (
          <div className="card p-6 no-print">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                const input = e.target.value;
                const nonSpaceLength = input.replace(/\s+/g, '').length;
                if (nonSpaceLength <= 4500) {
                  setJobDescription(input);
                } else {
                  const allowed = input
                    .split('')
                    .reduce((acc, char) => {
                      if (acc.replace(/\s+/g, '').length < 4500) {
                        return acc + char;
                      }
                      return acc;
                    }, '');
                  setJobDescription(allowed);
                }
              }}
              placeholder="Paste the job description here..."
              rows={12}
              className="input resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">
                {jobDescription.replace(/\s+/g, '').length}/4500
              </span>
              <span className='flex items-center space-x-2'>
                Credits : {user.credits}<Coins className="w-5 ml-1 h-5 mr-2" />
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating || !jobDescription.trim() || stats?.profileCompleteness < 60}
              className="btn w-full mt-6 btn-primary"
            >
              {generating ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner className="animate-spin mr-2" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {stats?.profileCompleteness < 60 ? (
                    <span className="  font-medium">
                      Complete your profile first
                    </span>
                  ) : (
                    <>
                      
                      <Coins className="w-5 h-5" />
                      <span>1 credit Generate Resume</span>
                    </>
                  )}
                </span>
              )}
            </button>

          </div>
        )}



        {/* Preview Section */}
        <div
          className={`card p-6 flex flex-col`}
        >
          <div className="flex justify-between items-center mb-4 no-print">
            <h2 className="text-xl font-semibold">Preview</h2>
            {generatedResume && (
              <div className="flex space-x-2">
                {editMode && <button title='close edit mode' onClick={() => { setEditMode(false) }} className='btn btn-danger '>
                  close
                </button>}
                <button
                  onClick={() => (editMode ? handleSaveResume() : setEditMode(true))}
                  className="btn btn-secondary flex items-center"
                >
                  {editMode ? (
                    <>
                      <Save title='save this resume' className="w-4 h-4 mr-2" /> {
                        loading ? "Saving..." : "Save"
                      }

                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" /> Edit
                    </>
                  )}
                </button>

                <button onClick={handleExport} className="btn btn-primary flex items-center">
                  <Download className="w-4 h-4 mr-2" />{
                        loading ? "Exporting..." : "Export"
                      } 
                </button>
              </div>
            )}
          </div>

          <div className="min-h-96 border-2 overflow-hidden rounded-lg flex items-center justify-center  ">
            {generating ? (
              <div className="text-center">
                <GlowLoader />

                <p className="text-muted-foreground mt-4">Tailoring your resume... {progress}%</p>
              </div>
            ) : generatedResume ? (
              Template ? <Template data={generatedResume} /> : <p>No template</p>
            ) : (
              <div className="text-center text-muted-foreground">
                <Wand2 className="w-12 h-12 mx-auto mb-4" />
                <p>Your tailored resume will appear here</p>
              </div>
            )}
          </div>
        </div>



      </div>

      {
        genresume &&
        <div className='grid grid-cols-2 gap-4'>

          <ImprovementTips data={genresume?.improvementTips} />
          <PracticeFocus data={genresume?.practiceFocus} />
        </div>
      }

      <CoverLetter data={genresume?.coverLetter} />

    </div>
  );
}
