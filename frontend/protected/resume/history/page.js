"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, FileText, Calendar, ChevronDown, Trash2 } from "lucide-react";
import api from "@/lib/api";
import toast from 'react-hot-toast'
function ResumeHistoryPage() {
  const [resumes, setResumes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); // track which one is deleting

  const fetchResumes = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/resume/history?page=${page}&limit=10`);
      setResumes((prev) => [...prev, ...res.resumes]);
      setPagination(res.pagination);
      if(page!=1){
        toast.success('Resume load successfully !')
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      setDeleting(id);
      await api.delete(`/resume/delete/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchResumes(1);
  }, []);

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="p-4 card border rounded-lg  transition  "
          >
             <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {resume.title || "Untitled Resume"}
              </h2>
              <p className="text-sm  flex items-center gap-1 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date(resume.createdAt).toLocaleDateString()}
              </p>
          <Link href={`/protected/resume/${resume._id}`} className="block">
            
            <button  className="mt-3  w-full btn  btn-primary  disabled:opacity-50"
           > View Resume
              </button>
              </Link>
            <button
              onClick={() => handleDelete(resume._id)}
              disabled={deleting === resume._id}
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded   btn-danger disabled:opacity-50"
            >
              {deleting === resume._id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" /> Delete
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {pagination.page < pagination.pages && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchResumes(pagination.page + 1)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Load More
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ResumeHistoryPage;
