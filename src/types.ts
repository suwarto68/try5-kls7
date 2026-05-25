export type QuestionType = 'PG' | 'PGK' | 'BS' | 'MJ';
export type SubjectTopic = 'Aljabar' | 'Geometri' | 'Data';
export type CognitiveLevel = 'L1' | 'L2' | 'L3'; // L1: Pemahaman, L2: Aplikasi, L3: Penalaran (HOTS)

export interface MatchPair {
  id: string;
  leftText: string;
  rightOptions: string[];
  correctRightIndex: number; // Index in rightOptions
}

export interface Question {
  id: number;
  type: QuestionType;
  topic: SubjectTopic;
  level: CognitiveLevel;
  indicator: string;
  stimulusType?: 'table' | 'bar' | 'pie' | 'angle' | 'shape' | 'none';
  stimulusData?: any; // For custom diagrams/values
  questionText: string;
  options?: string[]; // Used for PG and PGK
  correctAnswer: any; // PG: string ('A'-'D'), PGK: string[] (e.g. ['A', 'C']), BS: boolean (true/false), MJ: Array of right indices mapped to each left item
  matchPairs?: MatchPair[]; // Used for MJ
  pembahasan: string;
}

export interface StudentResult {
  timestamp: string;
  nama: string;
  kelas: string;
  benar: number;
  salah: number;
  terjawab: number;
  ragu: number;
  belumTerjawab: number;
  nilai: number;
}
