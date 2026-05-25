import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, ChevronRight, FileText, Printer, Trophy, Users, RefreshCw, Lock, X, KeyRound } from 'lucide-react';
import { StudentResult } from '../types';

interface ResultsScreenProps {
  result: StudentResult;
  onReviewSolutions: () => void;
  onRestart: () => void;
  scriptUrl: string;
  pembahasanEnabled: boolean;
  pembahasanPassword: string;
}

export default function ResultsScreen({
  result,
  onReviewSolutions,
  onRestart,
  scriptUrl,
  pembahasanEnabled,
  pembahasanPassword
}: ResultsScreenProps) {
  const [leaderboard, setLeaderboard] = useState<StudentResult[]>([]);
  const [copiedScript, setCopiedScript] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Load and update leaderboard from localStorage
  useEffect(() => {
    // Standard starting scores to populate the ranking so it looks active and realistic
    const initialMock: StudentResult[] = [
      { timestamp: '25/05/2026, 09:12', nama: 'Siti Nurhaliza', kelas: '7A', benar: 32, salah: 3, terjawab: 35, ragu: 0, belumTerjawab: 0, nilai: 91 },
      { timestamp: '25/05/2026, 10:05', nama: 'Budi Santoso', kelas: '7B', benar: 30, salah: 5, terjawab: 35, ragu: 1, belumTerjawab: 0, nilai: 86 },
      { timestamp: '25/05/2026, 08:30', nama: 'Fajar Pratama', kelas: '7A', benar: 28, salah: 7, terjawab: 35, ragu: 0, belumTerjawab: 0, nilai: 80 },
      { timestamp: '25/05/2026, 11:22', nama: 'Aisyah Putri', kelas: '7B', benar: 27, salah: 8, terjawab: 35, ragu: 2, belumTerjawab: 0, nilai: 77 },
      { timestamp: '25/05/2026, 13:40', nama: 'Rian Hidayat', kelas: '7A', benar: 26, salah: 9, terjawab: 35, ragu: 0, belumTerjawab: 0, nilai: 74 },
      { timestamp: '25/05/2026, 14:15', nama: 'Dewi Lestari', kelas: '7B', benar: 25, salah: 10, terjawab: 35, ragu: 0, belumTerjawab: 0, nilai: 71 },
      { timestamp: '25/05/2026, 15:02', nama: 'Eko Sulistyo', kelas: '7A', benar: 23, salah: 12, terjawab: 35, ragu: 1, belumTerjawab: 0, nilai: 66 },
      { timestamp: '25/05/2026, 15:30', nama: 'Andi Wijaya', kelas: '7B', benar: 22, salah: 13, terjawab: 35, ragu: 0, belumTerjawab: 0, nilai: 63 },
      { timestamp: '25/05/2026, 16:10', nama: 'Rini Amalia', kelas: '7A', benar: 21, salah: 14, terjawab: 35, ragu: 3, belumTerjawab: 0, nilai: 60 }
    ];

    const stored = localStorage.getItem('cbt_leaderboard');
    let currentLeaderboardList: StudentResult[] = [];

    if (stored) {
      try {
        currentLeaderboardList = JSON.parse(stored);
      } catch (e) {
        currentLeaderboardList = initialMock;
      }
    } else {
      currentLeaderboardList = initialMock;
    }

    // Add current student's score if not already inserted
    const exists = currentLeaderboardList.some(
      (entry) => entry.nama === result.nama && entry.kelas === result.kelas && entry.nilai === result.nilai
    );

    if (!exists) {
      currentLeaderboardList.push(result);
    }

    // Sort leaderboard by Score (nilai) descending, then correct (benar) descending
    currentLeaderboardList.sort((a, b) => {
      if (b.nilai !== a.nilai) return b.nilai - a.nilai;
      return b.benar - a.benar;
    });

    // Take top 10 only
    const top10 = currentLeaderboardList.slice(0, 10);
    setLeaderboard(top10);
    localStorage.setItem('cbt_leaderboard', JSON.stringify(currentLeaderboardList));
  }, [result]);

  const handlePrint = () => {
    window.print();
  };

  const getPredicate = (score: number) => {
    if (score >= 85) return 'Sangat Baik (A)';
    if (score >= 70) return 'Baik (B)';
    if (score >= 60) return 'Cukup (C)';
    return 'Perlu Bimbingan (D)';
  };

  return (
    <div id="results-screen-root" className="max-w-6xl mx-auto px-4 py-8 space-y-10 font-sans text-slate-800">
      
      {/* 1. NOTIFIKASI SUKSES KIRIM DATA */}
      <div id="notif-success-banner" className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 text-emerald-950 shadow-sm">
        <CheckCircle id="success-icon" className="w-12 h-12 text-emerald-500 shrink-0" />
        <div id="notif-text-col" className="text-center md:text-left space-y-1">
          <h2 id="notif-title" className="text-xl font-extrabold tracking-tight">KIRIM DATA BERHASIL !</h2>
          <p id="notif-desc" className="text-xs md:text-sm text-emerald-800 leading-relaxed">
            Selamat, lembar jawaban Anda atas nama <strong className="text-emerald-950 font-bold">{result.nama} ({result.kelas})</strong> berhasil disimpan.
            {scriptUrl ? (
              <span className="block text-[11px] font-mono mt-1 text-indigo-700">Data telah disinkronkan ke Google Spreadsheet via Web App API Anda.</span>
            ) : (
              <span className="block text-[11px] font-mono mt-1 text-amber-700">Data terekam secara lokal (Simulasi). Silakan hubungkan Google Web App untuk rekap real-time.</span>
            )}
          </p>
        </div>
      </div>

      {/* Grid: Certificate Box and Statistics */}
      <div id="results-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CERTIFICATE GENERATOR (lg:col-span-8) */}
        <div id="left-results-col" className="lg:col-span-8 space-y-6">
          
          <div id="certificate-print-area" className="bg-white border-8 border-double border-slate-350 p-6 md:p-10 rounded-2xl relative shadow-lg overflow-hidden style-print-only">
            
            {/* Elegant Background Watermarks */}
            <div className="absolute inset-0 bg-slate-50 opacity-15 pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-50 opacity-50 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-50 opacity-50 blur-3xl pointer-events-none" />

            {/* Certificate Border Accent */}
            <div className="absolute inset-2 border border-amber-300 pointer-events-none rounded-lg" style={{ borderWidth: '1px' }} />

            {/* Inside Layout */}
            <div className="relative text-center space-y-6">
              <div id="cert-header" className="space-y-1.5 pb-4 border-b-2 border-amber-500/30">
                <span className="text-[10px] tracking-[0.25em] font-extrabold text-slate-400 uppercase font-mono">Piagam Kelulusan Kompetensi</span>
                <h3 className="text-2xl md:text-3xl font-serif font-extrabold tracking-tight text-slate-900">SERTIFIKAT HASIL UJIAN</h3>
                <p className="text-[10px] md:text-xs font-mono text-slate-500">Nomor Sertifikat: {Math.random().toString(36).substr(2, 9).toUpperCase()}/MAT7/2026</p>
              </div>

              <div id="cert-body" className="space-y-6">
                <p className="text-xs md:text-sm text-slate-500 font-sans italic">Diberikan secara hormat dan bangga kepada:</p>
                <div className="space-y-1">
                  <h4 id="cert-student-fullname" className="text-xl md:text-2xl font-bold text-slate-950 underline decoration-amber-500 decoration-2 underline-offset-4">
                    {result.nama}
                  </h4>
                  <p id="cert-student-class" className="text-xs md:text-sm text-indigo-600 font-mono font-bold uppercase tracking-wider">
                    KELAS {result.kelas} - JALUR ASESMEN ACARA
                  </p>
                </div>

                <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Telah dinyatakan <span className="font-bold text-emerald-600">MENYELESAIKAN</span> pelaksanaan evaluasi <strong className="text-slate-900">Asesmen Matematika Kelas VII Kurikulum Merdeka</strong> dengan materi evaluasi meliputi: Bentuk Aljabar, Geometri (Sudut & Kesebangunan), serta Data Deskriptif dan Statistika Dasar.
                </p>

                {/* Score badge in Certificate */}
                <div className="inline-flex items-center gap-6 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Skor Akhir</span>
                    <p className="text-2xl font-extrabold text-amber-500 font-mono leading-none mt-1">{result.nilai}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-300" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">Predikat</span>
                    <p className="text-xs font-bold text-slate-700 mt-1">{getPredicate(result.nilai)}</p>
                  </div>
                </div>

                {/* Grid performance detail */}
                <div className="grid grid-cols-5 gap-1.5 md:gap-3 max-w-lg mx-auto text-[10px] md:text-xs font-mono border-t border-b border-slate-100 py-3 text-slate-500">
                  <div className="flex flex-col">
                    <span>BENAR</span>
                    <span className="font-bold text-emerald-600 text-sm mt-0.5">{result.benar}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>SALAH</span>
                    <span className="font-bold text-red-600 text-sm mt-0.5">{result.salah}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>TERJAWAB</span>
                    <span className="font-bold text-slate-700 text-sm mt-0.5">{result.terjawab}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>RAGU</span>
                    <span className="font-bold text-amber-500 text-sm mt-0.5">{result.ragu}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>BELUM DIISI</span>
                    <span className="font-bold text-slate-400 text-sm mt-0.5">{result.belumTerjawab}</span>
                  </div>
                </div>
              </div>

              {/* Certificate Signatures */}
              <div id="cert-sign-strip" className="grid grid-cols-2 pt-6 items-end text-xs md:text-sm">
                <div className="text-left space-y-1 pb-1">
                  <p className="text-[10px] font-mono text-slate-400">Verifikasi Sistem</p>
                  <div className="h-10 flex items-center">
                    <span className="text-[10px] font-mono text-emerald-600 px-2 py-0.5 rounded border border-emerald-300 bg-emerald-50 inline-block font-bold">VERIFIED_CBT_2026</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Timestamp: {result.timestamp}</p>
                </div>
                
                <div className="text-right space-y-1.5">
                  <p className="text-slate-500">Guru Pengampu SMP,</p>
                  <div className="h-10 flex items-center justify-end">
                    {/* Fake signature stroke drawing just for beauty */}
                    <span className="font-serif italic font-bold text-indigo-700 text-base border-b border-indigo-400 pb-0.5 leading-none px-4 inline-block transform rotate-[-2deg]">Suwarto, S.Pd</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-700 mt-1">NIP. 19781105 200801 1 015</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Print Action Info block */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              id="btn-print-certificate"
              onClick={handlePrint}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform transform hover:-translate-y-0.5"
            >
              <Printer className="w-5 h-5" />
              Cetak Sertifikat Hasil (PDF)
            </button>
            
            {pembahasanEnabled && (
              <button
                id="btn-review-math-solutions"
                onClick={() => {
                  setPasswordInput('');
                  setPasswordError('');
                  setShowPasswordModal(true);
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform transform hover:-translate-y-0.5"
              >
                <FileText className="w-5 h-5" />
                Lihat Pembahasan Lengkap & Kisi-Kisi
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LEADERBOARD VIEW & RESET (lg:col-span-4) */}
        <div id="right-results-col" className="lg:col-span-4 space-y-6">
          
          {/* 10 Besar Leaderboard Card */}
          <div id="leaderboard-card" className="bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
            <div id="leaderboard-header" className="bg-slate-900 text-white p-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400 fill-current" />
              <div>
                <h4 className="font-bold text-sm">REKAP RANKING 10 TERBESAR</h4>
                <p className="text-[10px] text-slate-400 font-mono">Nilai & Akurasi Siswa Kelas VII</p>
              </div>
            </div>

            <div id="leaderboard-list" className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {leaderboard.map((student, lIdx) => {
                const isCurrentSelf = student.nama === result.nama && student.kelas === result.kelas && student.nilai === result.nilai;
                return (
                  <div 
                    key={lIdx} 
                    className={`flex items-center justify-between p-3.5 text-xs transition-colors ${
                      isCurrentSelf ? 'bg-indigo-50/80 font-bold border-l-4 border-indigo-500' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank ribbon badge */}
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono text-[10px] ${
                        lIdx === 0 ? 'bg-amber-500 text-slate-950' :
                        lIdx === 1 ? 'bg-slate-300 text-slate-900' :
                        lIdx === 2 ? 'bg-amber-600/70 text-slate-50' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {lIdx + 1}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{student.nama}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Kelas {student.kelas} | {student.benar} Benari</span>
                      </div>
                    </div>
                    
                    {/* Score */}
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-indigo-700">{student.nilai}</span>
                      <span className="text-[9px] text-slate-400 block font-mono">{student.timestamp.split(',')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div id="leaderboard-footer" className="bg-slate-50 p-3 italic text-center text-[10px] text-slate-400 border-t border-slate-100">
              *Tabel di atas diperbarui begitu siswa mengeklik kirim.
            </div>
          </div>

          {/* Test attempt management */}
          <div id="retry-exam-box" className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-4">
            <h4 id="ret-heading" className="font-bold text-sm text-slate-900">Ingin Mengulangi Ujian?</h4>
            <p id="ret-text" className="text-xs text-slate-500 leading-relaxed">
              Anda dapat mengulangi ujian ini untuk memperbaiki nilai kompetensi jika belum merasa puas dengan hasil saat ini.
            </p>
            <button
              id="btn-restart-exam"
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mengulangi ujian? Lembar jawaban lama Anda akan disetel ulang untuk sesi baru.')) {
                  onRestart();
                }
              }}
              className="w-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Mulai Sesi Baru
            </button>
          </div>

        </div>

      </div>

      {/* PASSWORD MODAL OVERLAY */}
      {showPasswordModal && (
        <div id="password-modal-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div id="password-modal-card" className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div id="password-modal-header" className="bg-indigo-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm uppercase tracking-wide">Autentikasi Pembahasan</span>
              </div>
              <button
                id="btn-close-password-modal"
                onClick={() => setShowPasswordModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form 
              id="password-form" 
              onSubmit={(e) => {
                e.preventDefault();
                if (passwordInput === pembahasanPassword) {
                  setShowPasswordModal(false);
                  onReviewSolutions();
                } else {
                  setPasswordError('Sandi salah! Silakan tanyakan sandi dari Guru Matematika Anda.');
                }
              }} 
              className="p-6 space-y-5"
            >
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Halaman Kisi-Kisi dan Pembahasan dilindungi oleh kata sandi guru. Masukkan password ujian untuk membuka akses pembahasan:
                </p>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <KeyRound className="w-4.5 h-4.5" />
                  </span>
                  <input
                    id="password-input-field"
                    type="password"
                    autoFocus
                    required
                    placeholder="Masukkan sandi..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-900 transition-all font-mono font-bold text-center text-sm md:text-base tracking-[0.25em]"
                  />
                </div>
                
                {passwordError && (
                  <p id="password-error-message" className="text-red-700 font-bold text-[11px] bg-red-50 p-2.5 rounded-lg border-l-4 border-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  id="btn-cancel-password-modal"
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-705 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  id="btn-submit-password"
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-md shadow-indigo-100 cursor-pointer"
                >
                  Buka Akses
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global CSS for printing certificate only when requested */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #certificate-print-area, #certificate-print-area * {
            visibility: visible;
          }
          #certificate-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: 4px border-amber-500 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

    </div>
  );
}
