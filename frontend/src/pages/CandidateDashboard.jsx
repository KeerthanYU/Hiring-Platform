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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    Welcome back, {user?.name || user?.email?.split('@')[0] || 'Candidate'}! 👋
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Ready to showcase your skills and advance your career?
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 mt-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white font-semibold">5 Tests Completed</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-white font-semibold">85% Avg Score</span>
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
            onClick={() => setActiveTab("test")}
            className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "test"
                ? "bg-white text-indigo-600 shadow-xl scale-105"
                : "bg-white/60 text-gray-600 hover:bg-white hover:shadow-lg hover:scale-102"
              }`}
          >
            <svg className={`w-6 h-6 ${activeTab === "test" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Take Assessment</span>
            {activeTab === "test" && (
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
            )}
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === "report"
                ? "bg-white text-indigo-600 shadow-xl scale-105"
                : "bg-white/60 text-gray-600 hover:bg-white hover:shadow-lg hover:scale-102"
              }`}
          >
            <svg className={`w-6 h-6 ${activeTab === "report" ? "text-indigo-600" : "text-gray-500 group-hover:text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Performance Reports</span>
            {activeTab === "report" && (
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
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
