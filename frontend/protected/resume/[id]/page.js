"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import api from "@/lib/api";
import ModernTemp from "@/template/ModernTemp";
import BasicTemp from "@/template/BasicTemp";
import MinimalTemp from "@/template/MinimalTemp";
import LoadingSpinner from "@/components/LoadingSpinner";

function ResumeDetailsPage() {
  const { id } = useParams();
  
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [Template, setTemplate] = useState(() => ModernTemp);

  const templates = [
    { id: "modern", name: "Modern", component: ModernTemp, preview: "/Resume/ModernTemp.jpg" },
    { id: "classic", name: "Classic", component: BasicTemp, preview: "/Resume/BasicTemp.jpg" },
    { id: "minimal", name: "Minimal", component: MinimalTemp, preview: "/Resume/MinimalTemp.png" },
  ];

  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/resume/history/${id}`);
        setResume(res.resume || null);
      } catch (error) {
        console.error("Error fetching resume:", error);
        setResume(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResume();
  }, [id]);

  // Update template dynamically
  const handleTemplateChange = (template) => {
    setTemplate(() => template.component);
    setSelectedTemplate(template.id);
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

  if (loading) return <LoadingSpinner />; // better UX spinner
  if (!resume) return <p className="p-6 text-red-500">Resume not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{resume.title || "Untitled Resume"}</h1>

      {/* Template Selector */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {templates.map((templ) => (
          <button
            key={templ.id}
            onClick={() => handleTemplateChange(templ)}
            className={`p-3 rounded-lg border-2 transition-colors ${
              selectedTemplate === templ.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-ring"
            }`}
          >
            <div className="aspect-[3/4] bg-muted rounded mb-2 border relative overflow-hidden">
              <Image src={templ.preview} alt={`${templ.name} preview`} fill style={{ objectFit: "cover" }} />
            </div>
            <p className="text-sm font-medium">{templ.name}</p>
          </button>
        ))}
      </div>

      {/* Render Resume Content */}
      <div className="border p-4 rounded  shadow-sm mb-6">
        {Template ? <Template data={resume.content} /> : <p>No template selected</p>}
      </div>
 
    </div>
  );
}

export default ResumeDetailsPage;
