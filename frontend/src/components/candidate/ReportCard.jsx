export default function ReportCard() {
  const reportData = {
    overallScore: 85,
    testsTaken: 5,
    skills: [
      { name: "React", score: 92, level: "Advanced", trend: "up" },
      { name: "JavaScript", score: 88, level: "Advanced", trend: "up" },
      { name: "CSS", score: 82, level: "Intermediate", trend: "stable" },
      { name: "Node.js", score: 78, level: "Intermediate", trend: "up" },
    ],
    recentTests: [
      { title: "React Fundamentals", score: 92, date: "Feb 1, 2026", status: "excellent" },
      { title: "JavaScript ES6+", score: 88, date: "Jan 28, 2026", status: "excellent" },
      { title: "CSS & Responsive Design", score: 82, date: "Jan 25, 2026", status: "good" },
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "from-green-500 to-emerald-600";
    if (score >= 70) return "from-blue-500 to-indigo-600";
    if (score >= 60) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-pink-600";
  };

  const getScoreBadge = (score) => {
    if (score >= 85) return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
    if (score >= 70) return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };
    if (score >= 60) return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Overall Score Card */}
      <div className="card-premium p-12 md:p-16 rounded-[3.5rem] border-2 border-indigo-50 shadow-2xl relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center tracking-tight">
            <div className="bg-indigo-600 p-2.5 rounded-xl mr-4 shadow-lg shadow-indigo-200">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            Performance Intelligence
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-gray-400 text-sm font-black uppercase tracking-[0.2em] mb-4 ml-1">Overall Assessment Score</p>
                <div className="flex items-baseline space-x-3">
                  <span className="text-9xl font-black bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">{reportData.overallScore}</span>
                  <span className="text-4xl font-bold text-gray-300">/ 100</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-[1.25rem] px-8 py-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">{reportData.testsTaken}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tests Taken</div>
                  </div>
                </div>
                <div className="flex items-center bg-green-50/50 border-2 border-green-100 rounded-[1.25rem] px-8 py-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-green-600">Top 15%</div>
                    <div className="text-xs font-bold text-green-400 uppercase tracking-widest">Efficiency Rank</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              {/* Circular Progress */}
              <div className="relative w-64 h-64 group">
                <div className="absolute inset-0 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-colors"></div>
                <svg className="transform -rotate-90 w-64 h-64 relative z-10">
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-gray-100"
                  />
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke="url(#scoreGradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 110}`}
                    strokeDashoffset={`${2 * Math.PI * 110 * (1 - reportData.overallScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20">
                  <span className="text-6xl font-black text-gray-900">{reportData.overallScore}</span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="card-premium p-12 md:p-16 rounded-[3rem] border-2 border-gray-50 shadow-2xl animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center tracking-tight">
          <div className="bg-purple-600 p-2 rounded-lg mr-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          Competency Matrix
        </h3>

        <div className="grid md:grid-cols-2 gap-10">
          {reportData.skills.map((skill, index) => (
            <div key={index} className="group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 rounded-[2rem] p-8 bg-white border-2 border-gray-100/50 hover:border-indigo-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getScoreColor(skill.score)} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-white font-black text-xl">{skill.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-xl tracking-tight">{skill.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{skill.level}</span>
                      {skill.trend === "up" && (
                        <div className="flex items-center text-green-600 text-[10px] font-black uppercase tracking-tighter bg-green-50 px-2 py-0.5 rounded-md">
                          <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Elevating
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-black bg-gradient-to-br ${getScoreColor(skill.score)} bg-clip-text text-transparent`}>{skill.score}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getScoreColor(skill.score)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                  style={{ width: `${skill.score}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tests */}
      <div className="card-premium p-12 md:p-16 rounded-[3rem] border-2 border-gray-50 shadow-2xl animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center tracking-tight">
          <div className="bg-pink-600 p-2 rounded-lg mr-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Assessment History
        </h3>

        <div className="space-y-6">
          {reportData.recentTests.map((test, index) => {
            const badge = getScoreBadge(test.score);
            return (
              <div key={index} className="group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 rounded-[2rem] p-10 bg-white border-2 border-gray-100/50 hover:border-pink-100">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h4 className="font-black text-gray-900 text-2xl tracking-tight">{test.title}</h4>
                      <span className={`px-5 py-1.5 ${badge.bg} ${badge.text} border-2 ${badge.border} rounded-full text-xs font-black uppercase tracking-widest`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest space-x-6">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {test.date}
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-center w-24 h-24 bg-gradient-to-br ${getScoreColor(test.score)} rounded-[2rem] shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-4xl font-black text-white">{test.score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 pt-10 border-t-2 border-gray-100">
          <button className="group w-full py-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-[1.5rem] font-black text-2xl hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-500 hover:-translate-y-1.5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <svg className="w-8 h-8 mr-3 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Initiate New Evaluation
            <svg className="w-8 h-8 ml-3 group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
