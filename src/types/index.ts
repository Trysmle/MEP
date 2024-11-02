export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  subject: string;
  source: string;
  status: 'active' | 'archived' | 'under_review';
  createdAt: string;
  updatedAt: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionBank {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  subjects: string[];
  completion: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
}

export interface UserProgress {
  questionId: string;
  status: 'completed' | 'flagged' | 'incorrect' | 'skipped';
  attempts: number;
  lastAttempted: string;
}