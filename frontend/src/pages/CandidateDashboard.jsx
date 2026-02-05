import { useState } from "react";
import SkillTest from "../components/candidate/SkillTest";
import ReportCard from "../components/candidate/ReportCard";
import useAuth from "../hooks/useAuth";

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("test");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 animate-float">
                  <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                    Welcome back, {user?.name || user?.email?.split('@')[0] || 'Candidate'}! 👋
                  </h1>
                  <p className="text-blue-100 text-xl font-medium opacity-90">
                    Ready to showcase your skills and advance your career?
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-8 mt-12">
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-[1.25rem] border border-white/20 shadow-xl hover:bg-white/20 transition-all cursor-default">
                  <div className="bg-green-400/20 p-2.5 rounded-xl">
                    <svg className="w-7 h-7 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-xl">5 Tests Completed</span>
                </div>
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-[1.25rem] border border-white/20 shadow-xl hover:bg-white/20 transition-all cursor-default">
                  <div className="bg-yellow-400/20 p-2.5 rounded-xl">
                    <svg className="w-7 h-7 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-xl">85% Avg Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-12 animate-slide-in-left">
          <button
            onClick={() => setActiveTab("test")}
            className={`group flex items-center space-x-4 px-10 py-5 rounded-[1.5rem] font-bold transition-all duration-300 ${activeTab === "test"
              ? "bg-white text-indigo-600 shadow-2xl scale-105 border-2 border-indigo-100"
              : "bg-white/40 text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-xl hover:scale-102 border-2 border-transparent"
              }`}
          >
            <svg className={`w-7 h-7 ${activeTab === "test" ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-lg">Take Assessment</span>
            {activeTab === "test" && (
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`group flex items-center space-x-4 px-10 py-5 rounded-[1.5rem] font-bold transition-all duration-300 ${activeTab === "report"
              ? "bg-white text-indigo-600 shadow-2xl scale-105 border-2 border-indigo-100"
              : "bg-white/40 text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-xl hover:scale-102 border-2 border-transparent"
              }`}
          >
            <svg className={`w-7 h-7 ${activeTab === "report" ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-lg">Performance Reports</span>
            {activeTab === "report" && (
              <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === "test" ? <SkillTest /> : <ReportCard />}
        </div>
      </div>
    </div>
  );
}
