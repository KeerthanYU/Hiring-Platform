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
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="card-premium p-8 animate-scale-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-7 h-7 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Performance Overview
        </h2>

        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-3xl p-10 mb-6">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-semibold mb-2 uppercase tracking-wide">Overall Score</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-7xl font-bold text-white">{reportData.overallScore}</span>
                <span className="text-3xl text-indigo-100">/100</span>
              </div>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <svg className="w-5 h-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white font-semibold">{reportData.testsTaken} Tests</span>
                </div>
                <div className="flex items-center bg-green-400/30 backdrop-blur-sm rounded-lg px-4 py-2">
                  <svg className="w-5 h-5 text-green-100 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-white font-semibold">Improving</span>
                </div>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="relative w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/20"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - reportData.overallScore / 100)}`}
                  className="text-white transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">Top 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Assessment */}
      <div className="card-premium p-8 animate-fade-in">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Skill Breakdown
        </h3>

        <div className="grid gap-6">
          {reportData.skills.map((skill, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getScoreColor(skill.score)} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{skill.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{skill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{skill.level}</span>
                      {skill.trend === "up" && (
                        <div className="flex items-center text-green-600 text-xs font-semibold">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Trending
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{skill.score}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getScoreColor(skill.score)} rounded-full transition-all duration-1000 shadow-lg`}
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
      <div className="card-premium p-8 animate-fade-in">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Assessments
        </h3>

        <div className="space-y-4">
          {reportData.recentTests.map((test, index) => {
            const badge = getScoreBadge(test.score);
            return (
              <div key={index} className="group hover:shadow-lg transition-all duration-300 rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">{test.title}</h4>
                      <span className={`px-3 py-1 ${badge.bg} ${badge.text} border ${badge.border} rounded-full text-xs font-bold uppercase tracking-wide`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {test.date}
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${getScoreColor(test.score)} rounded-2xl shadow-xl`}>
                    <span className="text-3xl font-bold text-white">{test.score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200">
          <button className="group w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Take Another Assessment
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
