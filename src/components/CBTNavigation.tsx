import { Check, ClipboardList, AlertTriangle } from 'lucide-react';

interface CBTNavigationProps {
  totalQuestions: number;
  currentIndex: number;
  answers: { [key: number]: any };
  doubtful: { [key: number]: boolean };
  onSelectQuestion: (index: number) => void;
}

export default function CBTNavigation({
  totalQuestions,
  currentIndex,
  answers,
  doubtful,
  onSelectQuestion
}: CBTNavigationProps) {
  
  // Helper to determine if a question has been answered
  const getQuestionState = (index: number) => {
    const qId = index + 1;
    const answer = answers[qId];
    const isDoubtful = doubtful[qId];

    if (isDoubtful) return 'doubtful'; // Yellow

    if (answer === undefined || answer === null) return 'unanswered';

    if (Array.isArray(answer)) {
      return answer.length > 0 ? 'answered' : 'unanswered';
    }

    if (typeof answer === 'object') {
      // Matching question state check (e.g. [0, 2, 1] etc)
      // Check if any element is not null/empty
      return Object.keys(answer).length > 0 ? 'answered' : 'unanswered';
    }

    if (typeof answer === 'boolean') {
      return 'answered';
    }

    if (typeof answer === 'string') {
      return answer.trim() !== '' ? 'answered' : 'unanswered';
    }

    return 'unanswered';
  };

  return (
    <div id="cbt-nav-container" className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm w-full">
      <div id="cbt-nav-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-3">
        <div id="nav-header-left" className="flex items-center gap-2">
          <ClipboardList id="nav-icon" className="w-5 h-5 text-indigo-500" />
          <h4 id="nav-lbl" className="font-bold text-slate-800 text-sm">PETA NAVIGASI SOAL UJIAN (1 BARIS RAPAT)</h4>
        </div>
        
        {/* State Legend */}
        <div id="nav-legend" className="flex flex-wrap items-center gap-3 text-xs">
          <div id="lg-now" className="flex items-center gap-1">
            <span id="pin-now" className="w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-white" />
            <span id="lg-txt-now" className="text-slate-500">Aktif</span>
          </div>
          <div id="lg-ok" className="flex items-center gap-1">
            <span id="pin-ok" className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            <span id="lg-txt-ok" className="text-slate-500">Terjawab</span>
          </div>
          <div id="lg-ragu" className="flex items-center gap-1">
            <span id="pin-ragu" className="w-3.5 h-3.5 rounded-full bg-amber-400" />
            <span id="lg-txt-ragu" className="text-slate-500">Ragu-Ragu</span>
          </div>
          <div id="lg-no" className="flex items-center gap-1">
            <span id="pin-no" className="w-3.5 h-3.5 rounded-full bg-slate-150 border border-slate-300" />
            <span id="lg-txt-no" className="text-slate-500">Belum diisi</span>
          </div>
        </div>
      </div>

      {/* Tightly-packed navigation buttons in exactly 1 horizontal row (scrollable, no gaps) */}
      <div id="cbt-map-scroller" className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-50">
        <div id="cbt-map-row" className="flex flex-row flex-nowrap shrink-0 border border-slate-300 rounded overflow-hidden min-w-max">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const qId = index + 1;
            const state = getQuestionState(index);
            const isActive = currentIndex === index;

            let btnBg = 'bg-slate-50 hover:bg-slate-100 text-slate-700'; // unanswered
            let textStyle = 'font-bold';

            if (state === 'answered') {
              btnBg = 'bg-emerald-500 text-white hover:bg-emerald-600';
            } else if (state === 'doubtful') {
              btnBg = 'bg-amber-400 text-slate-950 hover:bg-amber-500';
            }

            // Highlight active item with deep border or special decoration
            const borderStyle = isActive 
              ? 'ring-4 ring-indigo-600 ring-inset z-10 scale-[1.03] shadow-md shadow-indigo-200 text-slate-950 bg-indigo-50 border-indigo-600' 
              : 'border-r border-slate-300';

            return (
              <button
                key={index}
                id={`btn-nav-soal-${qId}`}
                onClick={() => onSelectQuestion(index)}
                className={`w-11 h-11 text-center text-xs justify-center items-center flex flex-col shrink-0 transition-all font-mono border-b border-t border-slate-300 select-none ${btnBg} ${borderStyle} ${textStyle} relative group cursor-pointer`}
                title={`Soal Nomor ${qId}`}
              >
                {/* Number */}
                <span id={`nav-no-text-${qId}`}>{qId}</span>
                
                {/* Mini status indicator */}
                {state === 'answered' && !isActive && (
                  <span id={`nav-ok-indicator-${qId}`} className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-emerald-250 rounded-full" />
                )}
                {state === 'doubtful' && !isActive && (
                  <span id={`nav-ragu-indicator-${qId}`} className="absolute bottom-1 right-1 w-2 h-2 text-slate-900"><AlertTriangle className="w-2.5 h-2.5 text-black" /></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
