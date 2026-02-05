import { useState } from "react";

export default function SkillTest() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A database management system",
        "A programming language",
        "A CSS framework"
      ]
    },
    {
      id: 2,
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "Java Syntax Extension",
        "JSON XML"
      ]
    },
    {
      id: 3,
      question: "What hook is used for side effects?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ]
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  if (submitted) {
    return (
      <div className="card-premium p-12 md:p-20 text-center animate-scale-in max-w-3xl mx-auto rounded-[3.5rem] border-2 border-green-50 shadow-2xl">
        <div className="mb-12">
          <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_20px_50px_rgba(16,185,129,0.3)] mb-8 animate-scale-in">
            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 tracking-tight">Well Done!</h2>
          <p className="text-gray-500 text-xl font-medium mb-10">
            Assessment successfully computed. Your results are ready for review.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-12">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600 mb-2">{Object.keys(answers).length}</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Completed</div>
            </div>
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-purple-600 mb-2">{questions.length}</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Items</div>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="group relative px-12 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-gray-900/20 hover:-translate-y-1 transition-all duration-500 inline-flex items-center"
        >
          <svg className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Restart Assessment
        </button>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="card-premium p-12 md:p-16 max-w-4xl mx-auto animate-fade-in shadow-2xl rounded-[3rem] border-2 border-indigo-50">
        <div className="text-center mb-12 space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float">
            <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Skill Assessment Test</h2>
          <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">
            Experience a professional-grade knowledge evaluation with {questions.length} carefully curated questions designed to challenge and showcase your expertise.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 text-center border-2 border-blue-100/50 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-indigo-600 mb-3">{questions.length}</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Questions</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-8 text-center border-2 border-purple-100/50 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-purple-600 mb-3">~5</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl p-8 text-center border-2 border-green-100/50 hover:shadow-lg transition-all">
            <div className="text-4xl font-bold text-green-600 mb-3">✓</div>
            <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Type</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50/50 rounded-3xl p-10 mb-12 border-2 border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center text-2xl tracking-tight">
            <div className="bg-indigo-600 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Crucial Instructions
          </h3>
          <ul className="grid md:grid-cols-2 gap-6 text-gray-600">
            {[
              "Read each question systematically before deciding",
              "Effortlessly move between navigation points",
              "Revise your choices anytime before final seal",
              "Submit only when you are 100% confident"
            ].map((instruction, i) => (
              <li key={i} className="flex items-start space-x-3 p-4 bg-white/80 rounded-2xl border border-gray-100 shadow-sm">
                <div className="bg-green-100 p-1 rounded-full mt-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-lg">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="group w-full py-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white rounded-[1.5rem] font-bold text-2xl hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1.5 transition-all duration-500 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span>Initialize Assessment</span>
          <svg className="w-8 h-8 ml-3 group-hover:translate-x-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="card-premium p-12 md:p-16 max-w-5xl mx-auto animate-fade-in rounded-[3rem] border-2 border-gray-50 shadow-2xl">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">System Evaluation</h2>
            <p className="text-gray-400 font-medium">Verify your technical proficiency</p>
          </div>
          <div className="bg-indigo-50 px-6 py-3 rounded-2xl border border-indigo-100">
            <span className="text-lg font-bold text-indigo-700">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <span>{Math.round(progress)}% progress computed</span>
          <span>{questions.length - currentQuestion - 1} pending</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-12">
        <div className="bg-gray-50/50 rounded-[2rem] p-8 md:p-10 mb-8 border-2 border-gray-100/50">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">{question.question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              className={`group w-full text-left p-8 rounded-2xl border-2 transition-all duration-500 ${selectedAnswer === index
                ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                : "border-gray-100 hover:border-indigo-200 hover:bg-gray-50 hover:shadow-xl"
                }`}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-6 font-black text-xl transition-all duration-500 ${selectedAnswer === index
                  ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                  }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className={`text-xl font-bold ${selectedAnswer === index ? "text-gray-900" : "text-gray-600"} transition-colors duration-500`}>
                  {option}
                </span>
                {selectedAnswer === index && (
                  <div className="ml-auto bg-indigo-100 p-2 rounded-full animate-scale-in">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-between items-center pt-10 border-t-2 border-gray-100 gap-6">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="group px-10 py-5 border-2 border-gray-200 rounded-2xl font-bold text-lg text-gray-500 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-500 flex items-center"
        >
          <svg className="w-6 h-6 mr-3 group-hover:-translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex gap-4">
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="group px-12 py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-500 flex items-center"
            >
              Advance
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="group px-12 py-5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1.5 transition-all duration-500 flex items-center"
            >
              <svg className="w-6 h-6 mr-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Final Submission
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
