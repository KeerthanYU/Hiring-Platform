import { useState } from "react";

export default function CandidateList() {
  const [filter, setFilter] = useState("all");

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      score: 92,
      skills: ["React", "TypeScript", "Node.js"],
      status: "qualified",
      testDate: "Feb 1, 2026",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      score: 88,
      skills: ["JavaScript", "Python", "AWS"],
      status: "qualified",
      testDate: "Jan 30, 2026",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.d@example.com",
      score: 76,
      skills: ["React", "CSS", "UI/UX"],
      status: "pending",
      testDate: "Jan 28, 2026",
      avatar: "ED"
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.w@example.com",
      score: 84,
      skills: ["Vue", "Node.js", "MongoDB"],
      status: "qualified",
      testDate: "Jan 25, 2026",
      avatar: "JW"
    },
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    if (filter === "all") return true;
    if (filter === "qualified") return candidate.status === "qualified";
    if (filter === "pending") return candidate.status === "pending";
    return true;
  });

  const getScoreColor = (score) => {
    if (score >= 85) return "from-green-500 to-emerald-600";
    if (score >= 70) return "from-blue-500 to-indigo-600";
    return "from-yellow-500 to-orange-600";
  };

  const getStatusBadge = (status) => {
    if (status === "qualified") {
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        dot: "bg-green-500"
      };
    }
    return {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      dot: "bg-yellow-500"
    };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Filters */}
      <div className="card-premium p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <svg className="w-7 h-7 mr-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Candidate Pool
            </h2>
            <p className="text-gray-600 mt-1">{filteredCandidates.length} candidates found</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${filter === "all"
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              All ({candidates.length})
            </button>
            <button
              onClick={() => setFilter("qualified")}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${filter === "qualified"
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Qualified ({candidates.filter(c => c.status === "qualified").length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${filter === "pending"
                ? "bg-white text-purple-600 shadow-md"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              Pending ({candidates.filter(c => c.status === "pending").length})
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate, index) => {
            const badge = getStatusBadge(candidate.status);
            return (
              <div
                key={candidate.id}
                className="card-premium p-6 hover-lift group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-xl">
                        {candidate.avatar}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {candidate.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {candidate.email}
                      </div>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${getScoreColor(candidate.score)} rounded-2xl shadow-xl`}>
                    <span className="text-2xl font-bold text-white">{candidate.score}</span>
                  </div>
                </div>

                {/* Status & Date */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-100">
                  <div className={`flex items-center space-x-2 px-4 py-2 ${badge.bg} ${badge.border} border-2 rounded-full`}>
                    <div className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`}></div>
                    <span className={`text-sm font-bold uppercase tracking-wide ${badge.text}`}>
                      {candidate.status}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {candidate.testDate}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-lg text-sm font-semibold border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                  <button className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </button>
                  <button className="px-5 py-3 border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-premium p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}
