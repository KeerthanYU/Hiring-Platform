import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { cn } from "../../utils/cn";

export default function SkillTest() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which hook would you use to store a mutable value that doesn't cause a re-render when updated?",
      options: [
        "useMemo",
        "useRef",
        "useState",
        "useReducer"
      ]
    },
    {
      id: 2,
      question: "In Tailwind CSS, how would you apply a backdrop blur to an element?",
      options: [
        "blur-md",
        "backdrop-blur-md",
        "filter-blur",
        "glass-blur"
      ]
    },
    {
      id: 3,
      question: "What is the primary benefit of using Vite over Create React App (CRA)?",
      options: [
        "Built-in testing library",
        "ESM-based HMR for faster development",
        "Better mobile support",
        "Smaller production bundles only"
      ]
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmit = () => setSubmitted(true);
  const handleNext = () => currentQuestion < questions.length - 1 && setCurrentQuestion(prev => prev + 1);
  const handlePrevious = () => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1);

  const handleReset = () => {
    setSubmitted(false);
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  if (submitted) {
    return (
      <Card className="p-12 text-center max-w-2xl mx-auto border-emerald-500/20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Assessment Completed</h2>
        <p className="text-[var(--color-text-secondary)] mb-8">Your results have been processed by our AI and sent to the recruiter.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[var(--color-bg-tertiary)] p-4 rounded-2xl border border-[var(--color-border-primary)]">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{Object.keys(answers).length}</div>
            <div className="text-xs text-[var(--color-text-muted)] uppercase">Answered</div>
          </div>
          <div className="bg-[var(--color-bg-tertiary)] p-4 rounded-2xl border border-[var(--color-border-primary)]">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{questions.length}</div>
            <div className="text-xs text-[var(--color-text-muted)] uppercase">Total Items</div>
          </div>
        </div>

        <Button variant="secondary" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Take Another Test
        </Button>
      </Card>
    );
  }

  if (!started) {
    return (
      <Card className="p-10 max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-violet/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-violet">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">React & Design Mastery</h2>
          <p className="text-[var(--color-text-secondary)]">Evaluate your skills in modern frontend development.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-4 mb-10 text-sm">
          <div className="glass p-4 rounded-xl flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-cyan" />
            <span className="text-[var(--color-text-secondary)]">~15 Minutes</span>
          </div>
          <div className="glass p-4 rounded-xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-violet" />
            <span className="text-[var(--color-text-secondary)]">AI Adaptive Difficulty</span>
          </div>
          <div className="glass p-4 rounded-xl flex items-center gap-3">
            <Info className="w-5 h-5 text-[var(--color-text-muted)]" />
            <span className="text-[var(--color-text-secondary)]">3 Core Questions</span>
          </div>
        </div>

        <Button onClick={() => setStarted(true)} className="w-full h-14 text-lg gap-2">
          Start Assessment
          <ChevronRight className="w-5 h-5" />
        </Button>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-brand-violet/10 border border-brand-violet/20 rounded-full text-xs font-bold text-brand-violet uppercase">
            Step {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <div className="text-xs text-[var(--color-text-muted)] font-medium">Auto-saving progress...</div>
      </header>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-[var(--color-bg-tertiary)] rounded-full mb-10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(question.id, index)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
                  selectedAnswer === index
                    ? "bg-brand-violet/10 border-brand-violet text-[var(--color-text-primary)] shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                    : "bg-[var(--color-bg-tertiary)] border-[var(--color-border-primary)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-tertiary)]/80 hover:border-[var(--color-border-primary)]/80"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors",
                    selectedAnswer === index ? "bg-brand-violet text-white" : "bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg font-medium">{option}</span>
                  {selectedAnswer === index && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto text-brand-violet">
                      <CheckCircle2 className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <footer className="mt-12 flex items-center justify-between border-t border-[var(--color-border-primary)] pt-8">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentQuestion < questions.length - 1 ? (
          <Button onClick={handleNext} className="gap-2 px-8">
            Next Question
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="primary" className="px-8 shadow-emerald-500/20">
            Finish & Submit
          </Button>
        )}
      </footer>
    </div>
  );
}
