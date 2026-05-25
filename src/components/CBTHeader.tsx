import React, { useEffect, useState } from 'react';
import { Clock, LogOut, User, Award } from 'lucide-react';

interface CBTHeaderProps {
  nama: string;
  kelas: string;
  onLogout: () => void;
  onTimeUp: () => void;
  totalSoal: number;
  jawabanTerisiCount: number;
}

export default function CBTHeader({
  nama,
  kelas,
  onLogout,
  onTimeUp,
  totalSoal,
  jawabanTerisiCount
}: CBTHeaderProps) {
  // Let's set 90 minutes = 5400 seconds
  const [secondsLeft, setSecondsLeft] = useState(5400);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isUrgent = secondsLeft < 600; // < 10 mins

  const progressPercentage = Math.round((jawabanTerisiCount / totalSoal) * 100);

  return (
    <header id="cbt-header-root" className="bg-slate-900 border-b border-slate-700 text-white shadow-md">
      <div id="cbt-header-container" className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        
        {/* Left Section: ANBK branding and student info */}
        <div id="cbt-header-left" className="flex items-center gap-3 w-full md:w-auto">
          <div id="cbt-badge" className="bg-amber-500 rounded-lg p-1.5 md:p-2 shrink-0">
            <span id="badge-lbl" className="text-slate-950 font-extrabold text-xs md:text-sm tracking-widest block text-center">CBT</span>
          </div>
          <div id="cbt-student-info">
            <div id="student-name-row" className="flex items-center gap-1.5 font-medium text-slate-100 text-sm md:text-base">
              <User id="u-icon" className="w-4 h-4 text-amber-500" />
              <span>{nama}</span>
              <span id="student-class-tag" className="bg-slate-800 text-indigo-400 text-xs px-2 py-0.5 rounded-full border border-slate-700">{kelas}</span>
            </div>
            <p id="cbt-subject-title" className="text-xs text-slate-400 mt-0.5">Asesmen Literasi Numerasi Matematika Kelas VII</p>
          </div>
        </div>

        {/* Center Section: Progress bar */}
        <div id="cbt-header-center" className="w-full md:w-64 flex flex-col gap-1 px-2">
          <div id="progress-text-row" className="flex justify-between text-xs text-slate-400">
            <span>Kemajuan Jawaban:</span>
            <span className="text-indigo-400 font-semibold">{jawabanTerisiCount} / {totalSoal} Soal ({progressPercentage}%)</span>
          </div>
          <div id="progress-bar-bg" className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              id="progress-bar-val"
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Right Section: Timer and Quit button */}
        <div id="cbt-header-right" className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-2 md:pt-0 border-t border-slate-800 md:border-0">
          <div 
            id="timer-box" 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
              isUrgent 
                ? 'bg-red-950/80 border-red-500 text-red-200 animate-pulse' 
                : 'bg-slate-800/80 border-slate-700 text-amber-400'
            }`}
          >
            <Clock id="clock-icon" className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-amber-500'}`} />
            <div id="timer-text-col" className="flex flex-col">
              <span id="timer-title" className="text-[9px] uppercase tracking-wider text-slate-400 font-mono -mb-0.5">Sisa Waktu</span>
              <span id="timer-val" className="font-mono text-sm md:text-base font-bold select-none">{formatTime(secondsLeft)}</span>
            </div>
          </div>

          <button
            id="btn-quit-exam"
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin keluar dari halaman ujian? Hasil dan progres saat ini dapat hilang jika belum terkirim.')) {
                onLogout();
              }
            }}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow-red-900"
          >
            <LogOut id="logout-icon" className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>

      </div>
    </header>
  );
}
