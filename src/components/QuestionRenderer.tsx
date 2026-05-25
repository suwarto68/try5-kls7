import React from 'react';
import { Question } from '../types';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  currentAnswer: any; // PG: 'A'-'D' | PGK: string[] | BS: boolean | MJ: { [pairId: string]: string } or number[]
  onChangeAnswer: (answer: any) => void;
  isDoubtful: boolean;
  onToggleDoubtful: () => void;
}

export default function QuestionRenderer({
  question,
  currentAnswer,
  onChangeAnswer,
  isDoubtful,
  onToggleDoubtful
}: QuestionRendererProps) {
  
  // Handle PG Single Select
  const handlePGSelect = (optionLetter: string) => {
    onChangeAnswer(optionLetter);
  };

  // Handle PGK Multi Select
  const handlePGKSelect = (optionLetter: string) => {
    const list = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    if (list.includes(optionLetter)) {
      onChangeAnswer(list.filter((x) => x !== optionLetter));
    } else {
      onChangeAnswer([...list, optionLetter].sort());
    }
  };

  // Handle BS (True/False)
  const handleBSSelect = (val: boolean) => {
    onChangeAnswer(val);
  };

  // Handle MJ (Menjodohkan)
  // For Menjodohkan, currentAnswer will be stored as an array of selected rightIndices corresponding to each left pair
  // e.g. [null, 2, 1] means 1st left is unanswered, 2nd left is matched with rightOptions[2], etc.
  const handleMatchSelect = (pairIndex: number, rightSelectedIndex: number) => {
    // Initialize or copy current mapping array
    const defaultLength = question.matchPairs ? question.matchPairs.length : 0;
    const currentList = Array.isArray(currentAnswer) 
      ? [...currentAnswer] 
      : Array(defaultLength).fill(null);
    
    currentList[pairIndex] = rightSelectedIndex;
    onChangeAnswer(currentList);
  };

  // Render HTML equations cleanly (simplified regex or styled spans for SMP text)
  // Since we don't have LaTeX engine active by default, we can output clean math typography by replacing $...$ with beautiful styled tags or inline italics.
  const renderMathText = (text: string) => {
    if (!text) return '';
    const parts = text.split('$');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // It's math
        return (
          <span key={index} className="font-mono text-sm font-semibold bg-indigo-50 text-indigo-950 px-1.5 py-0.5 rounded border border-indigo-100 mx-0.5 inline-block">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Render SVG Diagrams or Tables based on Stimulus
  const renderStimulus = () => {
    if (!question.stimulusType || question.stimulusType === 'none') return null;

    const { stimulusType, stimulusData } = question;

    if (stimulusType === 'table' && stimulusData) {
      return (
        <div id="stimulus-table-container" className="my-4 overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm max-w-full">
          <table id="stimulus-tbl" className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr id="tbl-row-hdr" className="bg-slate-100 border-b border-slate-200">
                {stimulusData.headers.map((head: string, idx: number) => (
                  <th key={idx} className="px-4 py-3 font-bold text-slate-700">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stimulusData.rows.map((row: string[], rowIdx: number) => (
                <tr key={rowIdx} className="border-b border-slate-150 hover:bg-slate-50 transition-colors">
                  {row.map((cell: string, cellIdx: number) => (
                    <td key={cellIdx} className="px-4 py-2.5 font-medium text-slate-600">{renderMathText(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (stimulusType === 'bar' && stimulusData) {
      const { labels, values, labelName } = stimulusData;
      const maxVal = Math.max(...values, 10);
      return (
        <div id="stimulus-bar-container" className="my-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
          <p id="bar-title" className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">{labelName || 'DIAGRAM BATANG DATA'}</p>
          <div id="bar-svg-box" className="h-48 md:h-56 flex items-end gap-3 md:gap-4 px-2 pt-4 border-b border-l border-slate-350">
            {values.map((val: number, idx: number) => {
              const heightPct = Math.max((val / maxVal) * 80, 8); // at least 8% height so it's clickable/visible
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <span className="bg-slate-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity translate-y-1">
                    {val}
                  </span>
                  {/* Bar */}
                  <div 
                    className="w-full bg-indigo-500 hover:bg-amber-500 rounded-t-md transition-all duration-300 relative shadow-sm"
                    style={{ height: `${heightPct}%` }}
                  >
                    <span className="absolute inset-x-0 top-1 text-[10px] font-bold text-white text-center sm:block hidden">{val}</span>
                  </div>
                  {/* Label */}
                  <span className="text-[10px] md:text-xs font-semibold text-slate-500 text-center truncate w-full">{labels[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (stimulusType === 'pie' && stimulusData) {
      const { segments } = stimulusData;
      // Predefined colors for pie segments (Tailwind hex)
      const colors = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#14b8a6', '#8b5cf6'];
      
      // Calculate pie paths
      let cumulativePercent = 0;
      const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
      };

      const totalValue = segments.reduce((acc: number, s: any) => acc + s.value, 0);

      return (
        <div id="stimulus-pie-container" className="my-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
          <div id="pie-visual" className="relative w-40 h-40 md:w-48 md:h-48">
            <svg viewBox="-1 -1 2 2" className="transform -rotate-90 w-full h-full">
              {segments.map((slice: any, idx: number) => {
                const percent = slice.value / totalValue;
                const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                cumulativePercent += percent;
                const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                const largeArcFlag = percent > 0.5 ? 1 : 0;
                
                // SVG Path for slice
                const pathData = [
                  `M 0 0`,
                  `L ${startX} ${startY}`,
                  `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                  `Z`
                ].join(' ');

                return (
                  <path 
                    key={idx} 
                    d={pathData} 
                    fill={colors[idx % colors.length]} 
                    className="hover:opacity-90 transition-opacity cursor-pointer stroke-white stroke-[0.015]"
                    title={`${slice.label}: ${slice.value}`}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-inner">
                <span className="text-[10px] md:text-xs font-bold text-slate-800 text-center uppercase">ANBK<br />Data</span>
              </div>
            </div>
          </div>

          {/* Legends */}
          <div id="pie-legends" className="grid grid-cols-2 md:grid-cols-1 gap-3 shrink-0">
            {segments.map((slice: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded" style={{ backgroundColor: colors[idx % colors.length] }} />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-705">{slice.label}</span>
                  <span className="text-[10px] text-slate-400">{slice.value}% dari {stimulusData.totalStudent || stimulusData.totalFamily || '100'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (stimulusType === 'angle' && stimulusData) {
      const { type } = stimulusData;
      if (type === 'berpelurus') {
        return (
          <div id="stimulus-angle-box" className="my-4 p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center">
            <svg id="svg-angle-berpelurus" width="280" height="130" className="bg-white rounded border border-slate-150">
              {/* Ground horizontal line */}
              <line x1="30" y1="100" x2="250" y2="100" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
              {/* Vertex center point */}
              <circle cx="140" cy="100" r="5" fill="#f59e0b" />
              
              {/* Angle ray at 34 degree base (146 degrees internally) */}
              {/* 140 + 80 * cos(146 deg), 100 - 80 * sin(146 deg) */}
              {/* 146 deg in rad ~ 2.548. cos = -0.829, sin = 0.559 */}
              {/* So target point layout: dx = -66, dy = -44 */}
              <line x1="140" y1="100" x2="80" y2="40" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
              
              {/* Arc indicator 1 */}
              <path d="M 170 100 A 30 30 0 0 0 115 80" fill="none" stroke="#d97706" strokeWidth="2" />
              {/* Arc indicator 2 */}
              <path d="M 120 90 A 25 25 0 0 1 100 100" fill="none" stroke="#2563eb" strokeWidth="2" />

              {/* Labels */}
              <text x="60" y="80" fill="#4f46e5" className="text-xs font-bold font-sans">3x°</text>
              <text x="170" y="85" fill="#d97706" className="text-xs font-bold font-sans">(2x + 10)°</text>
              <text x="30" y="118" fill="#64748b" className="text-[10px] font-mono">P</text>
              <text x="135" y="118" fill="#64748b" className="text-[10px] font-mono">Q</text>
              <text x="240" y="118" fill="#64748b" className="text-[10px] font-mono">R</text>
              <text x="70" y="32" fill="#64748b" className="text-[10px] font-mono">S</text>
            </svg>
            <span id="angle-caption" className="text-[10px] text-slate-400 font-mono mt-1.5">Gambar: Sudut berpelurus ∠PQR dipotong garis QS</span>
          </div>
        );
      }
    }

    if (stimulusType === 'shape' && stimulusData) {
      const { imageType } = stimulusData;
      if (imageType === 'persegi_panjang_sebangun') {
        return (
          <div id="stimulus-rects" className="my-4 p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-around gap-4 flex-wrap">
            {/* Box A */}
            <div id="box-pp-large" className="flex flex-col items-center">
              <div id="rect-lg-shape" className="w-32 h-20 bg-indigo-100 border-2 border-indigo-500 rounded relative shadow-inner flex items-center justify-center">
                <span className="text-[11px] font-bold text-indigo-950 font-mono">Bingkai Besar</span>
                <span className="absolute -top-5 inset-x-0 text-center font-mono text-xs font-semibold text-slate-500">15 cm</span>
                <span className="absolute -right-12 inset-y-0 flex items-center font-mono text-xs font-semibold text-slate-500">10 cm</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-2">Bingkai Foto A</span>
            </div>

            {/* Box B */}
            <div id="box-pp-small" className="flex flex-col items-center mt-4">
              <div id="rect-sm-shape" className="w-20.5 h-12 bg-amber-100 border-2 border-amber-500 rounded relative shadow-inner flex items-center justify-center">
                <span className="text-[11px] font-bold text-amber-950 font-mono">Bingkai Kecil</span>
                <span className="absolute -top-5 inset-x-0 text-center font-mono text-xs font-semibold text-slate-505">y cm</span>
                <span className="absolute -right-10 inset-y-0 flex items-center font-mono text-xs font-semibold text-slate-505">6 cm</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 mt-2">Bingkai Foto B (Sebangun)</span>
            </div>
          </div>
        );
      }

      if (imageType === 'tanah_sebangun') {
        return (
          <div id="stimulus-garden" className="my-4 p-4 border border-slate-200 rounded-xl bg-emerald-50/50 flex flex-col items-center">
            <div id="svg-garden-box" className="bg-white p-3 rounded shadow-sm border border-slate-150 flex items-center gap-6">
              <div className="w-28 h-20 border-2 border-dashed border-emerald-600 bg-emerald-50 rounded relative flex items-center justify-center">
                <span className="text-[10px] font-bold text-emerald-800">Kebun Asli</span>
                <span className="absolute -top-5 inset-x-0 text-center font-mono text-[10px] font-bold text-slate-500">12 meter</span>
                <span className="absolute -right-14 inset-y-0 flex items-center font-mono text-[10px] font-bold text-slate-501">8 meter</span>
              </div>
              <div className="text-xs text-slate-500 max-w-xs space-y-1">
                <p className="font-semibold text-slate-700">Skala Denah Berbeda-beda:</p>
                <p>Uji kesebangunan perbandingan panjang dan lebar harus bernilai <strong className="font-mono text-indigo-600">3 : 2</strong>.</p>
              </div>
            </div>
          </div>
        );
      }
    }

    return null;
  };

  // Convert array state to letters list (e.g. [0, 2, 1] means Left maps to rightOption matching letter)
  const getNumberMatchLetter = (idx: number) => {
    return String.fromCharCode(65 + idx); // 0 -> 'A', 1 -> 'B', etc.
  };

  return (
    <div id="question-renderer-root" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      
      {/* Header Info: Topic, Cognitive Level & Indicator of standard */}
      <div id="q-meta-card" className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-150">
        <div id="q-meta-left" className="flex flex-wrap items-center gap-2.5">
          <span id="topic-tag" className="bg-indigo-100 text-indigo-800 font-bold text-[10px] md:text-xs uppercase px-2.5 py-1 rounded-full border border-indigo-200">
            {question.topic}
          </span>
          <span id="level-tag" className={`text-white font-bold text-[10px] md:text-xs uppercase px-2.5 py-1 rounded-full ${
            question.level === 'L3' ? 'bg-red-500' : question.level === 'L2' ? 'bg-indigo-500' : 'bg-slate-500'
          }`}>
            Level {question.level} {question.level === 'L3' ? '(HOTS)' : question.level === 'L2' ? '(Aplikasi)' : '(Pemahaman)'}
          </span>
          <span id="type-tag" className="bg-amber-100 text-amber-900 border border-amber-200 font-bold text-[10px] md:text-xs px-2.5 py-1 rounded-full">
            {question.type === 'PG' ? 'Pilihan Ganda' : question.type === 'PGK' ? 'PG Kompleks' : question.type === 'BS' ? 'Benar / Salah' : 'Menjodohkan'}
          </span>
        </div>
        <div id="doubtful-toggle-cell" className="flex items-center gap-2">
          {/* Ragu-ragu Checkbox Button in ANBK */}
          <button
            id={`btn-doubtful-toggle-${question.id}`}
            onClick={onToggleDoubtful}
            className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              isDoubtful 
                ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-sm' 
                : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-600'
            }`}
          >
            <input 
              id={`chk-doubtful-${question.id}`}
              type="checkbox" 
              checked={isDoubtful}
              onChange={() => {}} // handled by onClick
              className="accent-amber-500 pointer-events-none"
            />
            <span>Ragu-Ragu</span>
          </button>
        </div>
      </div>

      {/* Indikator Pembelajaran */}
      <div id="indicator-card" className="flex items-start gap-2 text-[11px] md:text-xs bg-slate-55/65 text-slate-500 select-none pb-2 border-b border-dashed border-slate-200">
        <AlertCircle id="ind-icon" className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
        <p id="ind-text"><strong>Indikator ANBK:</strong> {question.indicator}</p>
      </div>

      {/* Question Stimulus Area */}
      {renderStimulus()}

      {/* Question Text */}
      <div id="question-prompt" className="text-slate-900 text-sm md:text-base font-medium leading-relaxed">
        <span id="q-no-marker" className="font-bold text-indigo-600 font-mono text-lg mr-1.5">{question.id}.</span>
        <div id="q-prompt-text" className="inline-block">{renderMathText(question.questionText)}</div>
      </div>

      {/* Answer Input Controls Based on Question Type */}
      <div id="answer-inputs-outer" className="pt-2">

        {/* 1. PILIHAN GANDA (PG) */}
        {question.type === 'PG' && question.options && (
          <div id="pg-options-grid" className="grid grid-cols-1 gap-3.5">
            {question.options.map((optionText, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = currentAnswer === letter;
              return (
                <button
                  key={idx}
                  id={`btn-pg-opt-${letter}`}
                  onClick={() => handlePGSelect(letter)}
                  className={`w-full text-left px-4 py-3 md:py-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 text-slate-950 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {/* Circular Letter Button */}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-colors ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-white text-slate-500 border-slate-300 group-hover:bg-slate-100 group-hover:text-slate-900'
                  }`}>
                    {letter}
                  </span>
                  <div className="text-xs md:text-sm font-semibold leading-snug">
                    {renderMathText(optionText)}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. PILIHAN GANDA KOMPLEKS (PGK) */}
        {question.type === 'PGK' && question.options && (
          <div id="pgk-options-grid" className="space-y-4">
            <span id="pgk-tip" className="text-xs font-medium text-amber-500 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg inline-block mb-2">
              ⚠️ Pilihan Ganda Kompleks: Anda dapat memilih lebih dari satu jawaban yang benar!
            </span>
            <div id="pgk-list" className="grid grid-cols-1 gap-3.5">
              {question.options.map((optionText, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(letter);
                return (
                  <button
                    key={idx}
                    id={`btn-pgk-opt-${letter}`}
                    onClick={() => handlePGKSelect(letter)}
                    className={`w-full text-left px-4 py-3 md:py-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 group ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 text-slate-950 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-705'
                    }`}
                  >
                    {/* Square Checkbox Indicator */}
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${
                      isSelected 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-slate-400 border-slate-300 group-hover:bg-slate-100'
                    }`}>
                      {isSelected ? '✓' : letter}
                    </span>
                    <div className="text-xs md:text-sm font-semibold leading-snug">
                      {renderMathText(optionText)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. BENAR / SALAH (BS) */}
        {question.type === 'BS' && (
          <div id="bs-card-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              id="btn-bs-true"
              onClick={() => handleBSSelect(true)}
              className={`py-5 px-6 rounded-2xl border-2 font-bold flex flex-col items-center gap-2 cursor-pointer transition-all ${
                currentAnswer === true
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md shadow-emerald-100'
                  : 'border-slate-200 bg-white hover:border-slate-400 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span id="bs-chk-t" className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
                currentAnswer === true ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-transparent'
              }`}>✓</span>
              <span className="text-lg">BENAR</span>
              <span className="text-[10px] font-normal text-slate-400 font-mono">Pernyataan bernilai matematis sahih</span>
            </button>

            <button
              id="btn-bs-false"
              onClick={() => handleBSSelect(false)}
              className={`py-5 px-6 rounded-2xl border-2 font-bold flex flex-col items-center gap-2 cursor-pointer transition-all ${
                currentAnswer === false
                  ? 'border-red-650 bg-red-50 text-red-950 shadow-md shadow-red-100'
                  : 'border-slate-200 bg-white hover:border-slate-400 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span id="bs-chk-f" className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${
                currentAnswer === false ? 'bg-red-600 border-red-600 text-white' : 'border-slate-300 text-transparent'
              }`}>✗</span>
              <span className="text-lg">SALAH</span>
              <span className="text-[10px] font-normal text-slate-400 font-mono">Pernyataan bernilai tidak tepat / keliru</span>
            </button>
          </div>
        )}

        {/* 4. MENJODOHKAN (MJ) */}
        {question.type === 'MJ' && question.matchPairs && (
          <div id="mj-layout-card" className="space-y-4">
            <span id="mj-tip" className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-150 px-3 py-1.5 rounded-lg inline-block mb-1">
              🎯 Hubungkan setiap pernyataan di sebelah kiri dengan pilihan pasangannya yang sesuai di sebelah kanan!
            </span>
            <div id="mj-pairs-list" className="space-y-3.5">
              {question.matchPairs.map((pair, pIdx) => {
                const selectedRightIdx = Array.isArray(currentAnswer) ? currentAnswer[pIdx] : null;
                return (
                  <div 
                    key={pair.id} 
                    id={`pair-row-${pIdx}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50/70 p-4 rounded-xl border border-slate-150"
                  >
                    {/* Left Statement */}
                    <div className="md:col-span-6 flex gap-2">
                      <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shrink-0">{pIdx + 1}</span>
                      <p className="text-xs md:text-sm font-semibold text-slate-800 leading-tight">
                        {renderMathText(pair.leftText)}
                      </p>
                    </div>

                    {/* Gap line layout decoration */}
                    <div className="hidden md:block md:col-span-1 text-center font-mono text-slate-400">➡️</div>

                    {/* Right Choice Selector Dropdown (Highly compatible and accessible style) */}
                    <div className="md:col-span-5">
                      <select
                        id={`sel-mj-${pIdx}`}
                        value={selectedRightIdx === null || selectedRightIdx === undefined ? '' : selectedRightIdx}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleMatchSelect(pIdx, val === '' ? null : parseInt(val, 10));
                        }}
                        className="w-full px-3 py-2 border-2 border-slate-200 hover:border-slate-350 focus:border-indigo-500 rounded-lg bg-white text-xs md:text-sm text-slate-905 outline-none font-medium transition-all"
                      >
                        <option value="">-- Pilih Jawaban Pasangan --</option>
                        {pair.rightOptions.map((opt, oIdx) => (
                          <option key={oIdx} value={oIdx}>
                            {getNumberMatchLetter(oIdx)}. {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
