import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Check, FileCheck, Search, Filter, HelpCircle, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { questions } from '../questions';
import { Question } from '../types';

interface PembahasanScreenProps {
  onBackToResults: () => void;
}

export default function PembahasanScreen({ onBackToResults }: PembahasanScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<'All' | 'Aljabar' | 'Geometri' | 'Data'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'PG' | 'PGK' | 'BS' | 'MJ'>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(1); // Q1 expanded by default
  const [activeTab, setActiveTab] = useState<'kisi-kisi' | 'pembahasan' | 'sertifikasi-guru'>('pembahasan');

  // Counts for topics
  const countTopic = (topic: 'Aljabar' | 'Geometri' | 'Data') => {
    return questions.filter((q) => q.topic === topic).length;
  };

  const countCognitive = (level: 'L1' | 'L2' | 'L3') => {
    return questions.filter((q) => q.level === level).length;
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = 
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toString() === searchTerm ||
      q.indicator.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesType = selectedType === 'All' || q.type === selectedType;

    return matchesSearch && matchesTopic && matchesType;
  });

  const getFormatName = (type: string) => {
    switch (type) {
      case 'PG': return 'Pilihan Ganda';
      case 'PGK': return 'Pilihan Ganda Kompleks';
      case 'BS': return 'Benar / Salah';
      case 'MJ': return 'Menjodohkan';
      default: return type;
    }
  };

  const getAnswerString = (q: Question) => {
    if (q.type === 'PG') {
      return `PILIHAN ${q.correctAnswer}`;
    }
    if (q.type === 'PGK') {
      return `PILIHAN: ${(q.correctAnswer as string[]).join(', ')}`;
    }
    if (q.type === 'BS') {
      return q.correctAnswer ? 'BENAR' : 'SALAH';
    }
    if (q.type === 'MJ') {
      // Menjodohkan correct index letters
      return (q.correctAnswer as number[]).map((idx, i) => `${i + 1} ➔ Match ${String.fromCharCode(65 + idx)}`).join(' ; ');
    }
    return '';
  };

  return (
    <div id="pembahasan-screen-root" className="max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans text-slate-800">
      
      {/* Top action header: back to results */}
      <div id="pembahasan-action-bar" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button
          id="btn-back-to-results"
          onClick={onBackToResults}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Sertifikat Hasil
        </button>

        <h1 id="pembahasan-main-title" className="text-xl md:text-2xl font-extrabold text-slate-950 font-sans tracking-tight">
          KISI-KISI, KUNCI, & PEMBAHASAN MATEMATIKA VII
        </h1>
      </div>

      {/* Grid statistics summary of questions composition (Rekap materi paling sering muncul) */}
      <div id="rekap-materi-bar" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Topic Breakdown Chart Card */}
        <div id="rekap-card-1" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-850">
            <BarChart3 className="w-4.5 h-4.5 text-indigo-500" />
            <span>REKAP DISTRIBUSI MATERI (35 SOAL)</span>
          </div>
          
          <div className="space-y-3 font-semibold text-xs text-slate-600">
            {/* Aljabar */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Bentuk Aljabar</span>
                <span className="font-bold text-indigo-600">12 Soal (34%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '34%' }} />
              </div>
            </div>

            {/* Geometri */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Geometri (Sudut & Kesebangunan)</span>
                <span className="font-bold text-amber-500">13 Soal (37%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '37%' }} />
              </div>
            </div>

            {/* Data & Statistika */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Data & Diagram Statistika</span>
                <span className="font-bold text-emerald-600">10 Soal (29%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '29%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cognitive Level Breakdown Card */}
        <div id="rekap-card-2" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-850">
            <BookOpen className="w-4.5 h-4.5 text-teal-500" />
            <span>REKAP LEVEL KOGNITIF (ANBK)</span>
          </div>

          <div className="space-y-3 font-semibold text-xs text-slate-600">
            {/* L1 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Level L1 (Pemahaman / Literasi)</span>
                <span className="font-bold text-slate-600">{countCognitive('L1')} Soal ({Math.round((countCognitive('L1')/35)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: `${(countCognitive('L1')/35)*100}%` }} />
              </div>
            </div>

            {/* L2 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Level L2 (Aplikasi / Numerasi)</span>
                <span className="font-bold text-indigo-600">{countCognitive('L2')} Soal ({Math.round((countCognitive('L2')/35)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(countCognitive('L2')/35)*100}%` }} />
              </div>
            </div>

            {/* L3 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Level L3 (Penalaran / HOTS)</span>
                <span className="font-bold text-red-500">{countCognitive('L3')} Soal ({Math.round((countCognitive('L3')/35)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: `${(countCognitive('L3')/35)*100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Question Type Breakdown */}
        <div id="rekap-card-3" className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-850">
            <FileCheck className="w-4.5 h-4.5 text-amber-500" />
            <span>KOMPOSISI FORMAT BUTIR SOAL</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-mono">PILIHAN GANDA</span>
              <strong className="text-sm font-extrabold text-slate-800">15 Butir</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-mono">PG KOMPLEKS</span>
              <strong className="text-sm font-extrabold text-slate-800">10 Butir</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-mono">BENAR / SALAH</span>
              <strong className="text-sm font-extrabold text-slate-800">5 Butir</strong>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block font-mono">MENJODOHKAN</span>
              <strong className="text-sm font-extrabold text-slate-800">5 Butir</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs navigation */}
      <div id="pembahasan-tabs" className="border-b border-slate-200 flex items-center gap-4">
        <button
          id="btn-tab-pembahasan"
          onClick={() => setActiveTab('pembahasan')}
          className={`pb-3 font-bold text-sm border-b-2 tracking-tight transition-colors cursor-pointer ${
            activeTab === 'pembahasan' ? 'border-indigo-650 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-850'
          }`}
        >
          Kunci Jawaban & Pembahasan Lengkap
        </button>
        <button
          id="btn-tab-kisi"
          onClick={() => setActiveTab('kisi-kisi')}
          className={`pb-3 font-bold text-sm border-b-2 tracking-tight transition-colors cursor-pointer ${
            activeTab === 'kisi-kisi' ? 'border-indigo-650 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-850'
          }`}
        >
          Kisi-Kisi Soal ANBK
        </button>
      </div>

      {/* TAB CONTENT 1: KISI-KISI SOAL */}
      {activeTab === 'kisi-kisi' && (
        <div id="tab-kisi-kisi" className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div id="t-kisi-hdr" className="bg-slate-50 p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 text-sm">MATRIKS KISI-KISI BUTIR EVALUASI MATEMATIKA</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 uppercase">
                  <th className="px-4 py-3 text-center border-r border-slate-200">No</th>
                  <th className="px-4 py-3 border-r border-slate-200">Materi Pokok</th>
                  <th className="px-4 py-3 text-center border-r border-slate-200">Bentuk Soal</th>
                  <th className="px-4 py-3 text-center border-r border-slate-200">Level</th>
                  <th className="px-4 py-3">Indikator Soal & Pengukuran ANBK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 text-center font-bold font-mono border-r border-slate-200">{q.id}</td>
                    <td className="px-4 py-2.5 font-bold text-indigo-805 border-r border-slate-200">{q.topic}</td>
                    <td className="px-4 py-2.5 text-center font-semibold text-slate-600 border-r border-slate-200">{getFormatName(q.type)}</td>
                    <td className="px-4 py-2.5 text-center border-r border-slate-200">
                      <span className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded ${
                        q.level === 'L3' ? 'bg-red-50 text-red-700' : q.level === 'L2' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {q.level === 'L3' ? 'L3 / HOTS' : q.level === 'L2' ? 'L2 / Aplikasi' : 'L1 / Paham'}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium text-slate-500 leading-tight">{q.indicator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: SOLUTIONS LIST */}
      {activeTab === 'pembahasan' && (
        <div id="tab-pembahasan-panel" className="space-y-6">
          
          {/* Filter Bar */}
          <div id="solutions-filter-bar" className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nomor, pembahasan, atau indikator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white px-9 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Quick selectors dropdown */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Materi:</span>
              </div>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value as any)}
                className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold outline-none text-slate-705"
              >
                <option value="All">Semua Materi</option>
                <option value="Aljabar">Bentuk Aljabar</option>
                <option value="Geometri">Geometri & Sudut</option>
                <option value="Data">Data & Statistika</option>
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold outline-none text-slate-705"
              >
                <option value="All">Semua Bentuk</option>
                <option value="PG">Pilihan Ganda</option>
                <option value="PGK">Pilihan Ganda Kompleks</option>
                <option value="BS">Benar / Salah</option>
                <option value="MJ">Menjodohkan</option>
              </select>
            </div>

          </div>

          {/* List of Collapsible elements */}
          <div id="solutions-collapsibles-list" className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12 text-slate-405 font-medium border border-slate-100 rounded-2xl bg-white">
                Tidak ada pembahasan yang cocok dengan kriteria pencarian Anda.
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = expandedQuestionId === q.id;
                return (
                  <div 
                    key={q.id} 
                    id={`solution-card-${q.id}`}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
                  >
                    {/* Collapsible Trigger Ribbon */}
                    <button
                      id={`btn-toggle-solution-${q.id}`}
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-mono bg-indigo-50 text-indigo-700 font-extrabold text-sm w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-indigo-200 shadow-sm">
                          {q.id}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-400 font-mono tracking-wide uppercase">
                            {q.topic} • {getFormatName(q.type)} • Level {q.level}
                          </p>
                          <h4 className="text-slate-800 font-bold text-xs md:text-sm truncate max-w-lg">
                            {q.questionText.replace(/\$/g, '')}
                          </h4>
                        </div>
                      </div>
                      
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-450 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-450 shrink-0" />}
                    </button>

                    {/* Collapsed Detailed explanation sheet */}
                    {isExpanded && (
                      <div id={`explanation-inner-${q.id}`} className="px-5 pb-6 border-t border-slate-100 pt-5 space-y-4">
                        
                        {/* Question Text block */}
                        <div className="space-y-1 bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                          <span className="text-[10px] font-bold text-slate-400 font-mono block">SOAL ASLI DAN INTENSI:</span>
                          <p className="text-slate-905 text-xs md:text-sm font-medium leading-relaxed">
                            {q.questionText}
                          </p>
                        </div>

                        {/* Indikator block */}
                        <div className="text-[11px] text-slate-500 font-mono">
                          🔍 <strong>Indikator Evaluasi:</strong> {q.indicator}
                        </div>

                        {/* Answers line */}
                        <div className="flex items-center gap-2 flex-wrap text-xs md:text-sm font-mono">
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-3 py-1 rounded-lg">
                            ✅ KUNCI JAWABAN: {getAnswerString(q)}
                          </span>
                        </div>

                        {/* Discussion Explanations */}
                        <div className="space-y-1.5 bg-indigo-50/20 border border-indigo-100 p-4 rounded-xl">
                          <h5 className="font-bold text-xs text-indigo-950 font-mono">📝 PEMBAHASAN ANALITIS GURU:</h5>
                          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                            {q.pembahasan}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

    </div>
  );
}
