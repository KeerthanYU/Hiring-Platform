import { useState } from "react";
import JobForm from "../components/recruiter/JobForm";
import CandidateList from "../components/recruiter/CandidateList";
import useAuth from "../hooks/useAuth";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("candidates");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Welcome, {user?.name || user?.email?.split('@')[0] || 'Recruiter'}! 🚀
                  </h1>
                  <p className="text-pink-100 text-lg">
                    Find and manage top talent for your organization
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-white font-semibold">4 Active Candidates</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-white font-semibold">3 Job Openings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 animate-slide-in-left">
          <button
            onClick={() => setActiveTab("candidates")}
            className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "candidates"
                ? "bg-white text-purple-600 shadow-xl scale-105"
                : "bg-white/60 text-gray-600 hover:bg-white hover:shadow-lg hover:scale-102"
              }`}
          >
            <svg className={`w-6 h-6 ${activeTab === "candidates" ? "text-purple-600" : "text-gray-500 group-hover:text-purple-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Candidates</span>
            {activeTab === "candidates" && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs font-bold">4</span>
              </div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("post-job")}
            className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "post-job"
                ? "bg-white text-purple-600 shadow-xl scale-105"
                : "bg-white/60 text-gray-600 hover:bg-white hover:shadow-lg hover:scale-102"
              }`}
          >
            <svg className={`w-6 h-6 ${activeTab === "post-job" ? "text-purple-600" : "text-gray-500 group-hover:text-purple-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Post New Job</span>
            {activeTab === "post-job" && (
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === "candidates" ? <CandidateList /> : <JobForm />}
        </div>
      </div>
    </div>
  );
}
