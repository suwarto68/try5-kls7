import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import CBTHeader from './components/CBTHeader';
import CBTNavigation from './components/CBTNavigation';
import QuestionRenderer from './components/QuestionRenderer';
import ResultsScreen from './components/ResultsScreen';
import PembahasanScreen from './components/PembahasanScreen';
import { questions } from './questions';
import { StudentResult } from './types';
import { BookOpen, AlertTriangle, ArrowLeft, ArrowRight, CheckSquare, Save } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'login' | 'exam' | 'results' | 'pembahasan'>('login');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('7A');
  const [scriptUrl, setScriptUrl] = useState('https://script.google.com/macros/s/AKfycbyoa14tzyA4geqSLAK2sbTt_HQM8tXniKUX1fm-XwKkGwQC4ce3Ux7vV1NGKTCjH0hP0w/exec');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [doubtful, setDoubtful] = useState<{ [key: number]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultData, setResultData] = useState<StudentResult | null>(null);
  const [pembahasanEnabled, setPembahasanEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('cbt_pembahasan_enabled');
    return saved === null ? true : saved === 'true';
  });
  const [pembahasanPassword, setPembahasanPassword] = useState<string>(() => {
    const saved = localStorage.getItem('cbt_pembahasan_password');
    return saved === null ? '12345678' : saved;
  });

  // Restore previous configurations on load (e.g. Teacher's GApp Script URL)
  useEffect(() => {
    const savedUrl = localStorage.getItem('cbt_teacher_script_url');
    if (savedUrl) {
       setScriptUrl(savedUrl);
    } else {
      setScriptUrl('https://script.google.com/macros/s/AKfycbyoa14tzyA4geqSLAK2sbTt_HQM8tXniKUX1fm-XwKkGwQC4ce3Ux7vV1NGKTCjH0hP0w/exec');
    }
  }, []);

  const handleLogin = (name: string, cls: string, url: string) => {
    setStudentName(name);
    setStudentClass(cls);
    setScriptUrl(url);
    if (url) {
      localStorage.setItem('cbt_teacher_script_url', url);
    }
    setAnswers({});
    setDoubtful({});
    setCurrentIndex(0);
    setScreen('exam');
  };

  const handleLogout = () => {
    setScreen('login');
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const handleToggleDoubtful = (qId: number) => {
    setDoubtful((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleChangeAnswer = (qId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: answer
    }));
  };

  // Check answers and calculate final score
  const calculateResult = (): StudentResult => {
    let benarCount = 0;
    let salahCount = 0;
    let terjawabCount = 0;
    let raguCount = 0;

    questions.forEach((q) => {
      const uAnswer = answers[q.id];
      const isDoubtful = doubtful[q.id];

      if (isDoubtful) {
        raguCount++;
      }

      // Check if answered
      let isAnsweredVal = false;
      if (uAnswer !== undefined && uAnswer !== null) {
        if (Array.isArray(uAnswer)) {
          isAnsweredVal = uAnswer.length > 0;
        } else if (typeof uAnswer === 'string') {
          isAnsweredVal = uAnswer.trim() !== '';
        } else {
          isAnsweredVal = true;
        }
      }

      if (isAnsweredVal) {
        terjawabCount++;
      }

      // Check correctness
      if (q.type === 'PG') {
        if (uAnswer === q.correctAnswer) {
          benarCount++;
        } else {
          salahCount++;
        }
      } 
      else if (q.type === 'PGK') {
        const userList = Array.isArray(uAnswer) ? [...uAnswer].sort() : [];
        const correctList = Array.isArray(q.correctAnswer) ? [...q.correctAnswer].sort() : [];
        const isCorrect = userList.length === correctList.length && userList.every((val, idx) => val === correctList[idx]);
        if (isCorrect) {
          benarCount++;
        } else {
          salahCount++;
        }
      } 
      else if (q.type === 'BS') {
        if (uAnswer === q.correctAnswer) {
          benarCount++;
        } else {
          salahCount++;
        }
      } 
      else if (q.type === 'MJ') {
        const userList = Array.isArray(uAnswer) ? uAnswer : [];
        const correctList = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        // For Menjodohkan, must match all pairs to get the question point
        const isCorrect = userList.length === correctList.length && userList.every((val, idx) => val === correctList[idx]);
        if (isCorrect) {
          benarCount++;
        } else {
          salahCount++;
        }
      }
    });

    const totalQuestionsCount = questions.length;
    const scoreVal = Math.round((benarCount / totalQuestionsCount) * 100);

    const formatter = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'short',
      timeStyle: 'short'
    });
    const nowStr = formatter.format(new Date());

    return {
      timestamp: nowStr,
      nama: studentName,
      kelas: studentClass,
      benar: benarCount,
      salah: totalQuestionsCount - benarCount, // Each item has 1 point, so wrong count = total - correct (unanswered counts as wrong)
      terjawab: terjawabCount,
      ragu: raguCount,
      belumTerjawab: totalQuestionsCount - terjawabCount,
      nilai: scoreVal
    };
  };

  const handleFinishExam = async () => {
    const confirmMsg = 'Apakah Anda yakin ingin menyelesaikan ujian dan mengirim lembar jawaban? Pastikan telah memeriksa seluruh soal.';
    if (!window.confirm(confirmMsg)) return;

    setIsSubmitting(true);
    const resultNode = calculateResult();

    // Send payload to teacher's google spreadsheet Web App
    if (scriptUrl) {
      try {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Avoid CORS preflight errors from Google Apps Script side
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify(resultNode)
        });
      } catch (e) {
        console.warn('Network sync warning:', e);
      }
    }

    setResultData(resultNode);
    setIsSubmitting(false);
    setScreen('results');
  };

  const handleTimeUp = () => {
    alert('Waktu ujian Anda telah habis! Sistem akan merekam hasil pengerjaan Anda otomatis.');
    const resultNode = calculateResult();
    setResultData(resultNode);
    setScreen('results');
  };

  const handleReviewSolutions = () => {
    setScreen('pembahasan');
  };

  const handleBackToResults = () => {
    setScreen('results');
  };

  const handleRestartExam = () => {
    setAnswers({});
    setDoubtful({});
    setCurrentIndex(0);
    setScreen('login');
  };

  const activeQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentAnswer = answers[activeQuestion.id];
  const isCurrentDoubtful = !!doubtful[activeQuestion.id];

  return (
    <div id="cbt-app-root" className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. LOGIN SCREEN CONTAINER */}
      {screen === 'login' && (
        <LoginScreen 
          onLogin={handleLogin} 
          savedScriptUrl={scriptUrl} 
          pembahasanEnabled={pembahasanEnabled}
          setPembahasanEnabled={setPembahasanEnabled}
          pembahasanPassword={pembahasanPassword}
          setPembahasanPassword={setPembahasanPassword}
        />
      )}

      {/* 2. EXAM ONLINE SCREEN CONTAINER */}
      {screen === 'exam' && (
        <div id="exam-screen-container" className="flex flex-col min-h-screen">
          <CBTHeader
            nama={studentName}
            kelas={studentClass}
            onLogout={handleLogout}
            onTimeUp={handleTimeUp}
            totalSoal={totalQuestions}
            jawabanTerisiCount={Object.keys(answers).length}
          />

          <main id="exam-main" className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 md:py-8">
            <div id="exam-grid-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Main column - Question content (lg:col-span-8) */}
              <div id="exam-content-col" className="lg:col-span-8 space-y-6">
                
                {/* Visual question numbers nav (forms the tightly packed single row map requested) */}
                <div id="exam-nav-box">
                  <CBTNavigation
                    totalQuestions={totalQuestions}
                    currentIndex={currentIndex}
                    answers={answers}
                    doubtful={doubtful}
                    onSelectQuestion={handleSelectQuestion}
                  />
                </div>

                <QuestionRenderer
                  question={activeQuestion}
                  currentAnswer={currentAnswer}
                  onChangeAnswer={(ans) => handleChangeAnswer(activeQuestion.id, ans)}
                  isDoubtful={isCurrentDoubtful}
                  onToggleDoubtful={() => handleToggleDoubtful(activeQuestion.id)}
                />

                {/* Bottom Navigation Buttons */}
                <div id="exam-bottom-navigation" className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 gap-3 shadow-sm">
                  
                  <button
                    id="btn-prev-question"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((idx) => Math.max(idx - 1, 0))}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-lg border font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      currentIndex === 0
                        ? 'opacity-40 bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm cursor-pointer'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    SOAL SEBELUMNYA
                  </button>

                  <div id="question-index-badge" className="font-mono text-xs font-extrabold text-slate-500 uppercase tracking-widest sm:block hidden">
                    SOAL {currentIndex + 1} DARI {totalQuestions}
                  </div>

                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      id="btn-next-question"
                      onClick={() => setCurrentIndex((idx) => Math.min(idx + 1, totalQuestions - 1))}
                      className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-100"
                    >
                      SOAL SELANJUTNYA
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id="btn-submit-exam"
                      onClick={handleFinishExam}
                      className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-100 animate-pulse"
                    >
                      <CheckSquare className="w-4 h-4" />
                      KIRIM JAWABAN (SELESAI)
                    </button>
                  )}

                </div>

              </div>

              {/* Right Sidebar - CBT info instructions (lg:col-span-4) */}
              <div id="exam-sidebar-col" className="lg:col-span-4 space-y-6">
                
                {/* Quick exam instruction mini widget */}
                <div id="exam-sidebar-instructions" className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-705 shadow-md space-y-4">
                  <h4 id="side-inst-heading" className="font-bold text-sm tracking-tight border-b border-slate-700 pb-2 text-amber-400 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-4.5 h-4.5" />
                    Informasi Sesi CBT
                  </h4>
                  
                  <div id="side-inst-kv" className="space-y-3 text-xs font-medium text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Soal:</span>
                      <span className="text-white">35 Butir Soal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Durasi Maksimal:</span>
                      <span className="text-white">90 Menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Database Server:</span>
                      <span className="text-white truncate max-w-[150px] text-cyan-400">
                        {scriptUrl ? 'SINKRON_AKTIF' : 'LOCAL_PREVIEW'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-3 text-[11px] leading-relaxed text-slate-400 space-y-1">
                    <p>💡 <strong className="text-amber-400 font-bold">Ragu-ragu:</strong> Jika Anda ragu-ragu, nomor soal akan berwarna kuning pada navigasi. Pastikan untuk menonaktifkannya sebelum klik kirim ujian.</p>
                  </div>
                </div>

                {/* Developer / Teacher Credit layout card */}
                <div id="exam-sidebar-developer-card" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center space-y-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 font-mono">Penanggung Jawab</span>
                  <h5 className="font-extrabold text-slate-800 text-sm">Suwarto, S.Pd</h5>
                  <p className="text-[11px] text-slate-500">Guru Bidang Studi Matematika Kelas VII<br />Kurikulum Merdeka</p>
                </div>

              </div>

            </div>
          </main>
        </div>
      )}

      {/* 3. RESULTS AND CERTIFICATE SCREEN CONTAINER */}
      {screen === 'results' && resultData && (
        <ResultsScreen
          result={resultData}
          onReviewSolutions={handleReviewSolutions}
          onRestart={handleRestartExam}
          scriptUrl={scriptUrl}
          pembahasanEnabled={pembahasanEnabled}
          pembahasanPassword={pembahasanPassword}
        />
      )}

      {/* 4. EXPLANATIONS & SOLUTIONS REVIEW SCREEN CONTAINER */}
      {screen === 'pembahasan' && (
        <PembahasanScreen onBackToResults={handleBackToResults} />
      )}

      {/* Submitting loader screen */}
      {isSubmitting && (
        <div id="global-submitting-loader" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <h2 className="text-lg font-bold">SINKRONISASI DATA UJIAN...</h2>
          <p className="text-xs text-slate-400 font-mono">Mengirim lembar jawaban siswa ke Google Spreadsheet</p>
        </div>
      )}

    </div>
  );
}
