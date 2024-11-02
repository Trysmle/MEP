import { Question, QuestionBank } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the primary mechanism of action for propofol?',
    options: [
      { id: '1a', text: 'GABA receptor modulation', isCorrect: true },
      { id: '1b', text: 'Sodium channel blockade', isCorrect: false },
      { id: '1c', text: 'Calcium channel inhibition', isCorrect: false },
      { id: '1d', text: 'Potassium channel activation', isCorrect: false }
    ],
    explanation: 'Propofol primarily acts by potentiating GABA-mediated inhibition in the CNS.',
    difficulty: 'hard',
    tags: ['Pharmacology', 'Anesthesia'],
    subject: 'Pharmacology',
    source: 'Standard Reference',
    status: 'active',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    text: 'Which of the following is the most common complication after carpal tunnel release surgery?',
    options: [
      { id: '2a', text: 'Pillar pain', isCorrect: true },
      { id: '2b', text: 'Infection', isCorrect: false },
      { id: '2c', text: 'Nerve injury', isCorrect: false },
      { id: '2d', text: 'Tendon adhesion', isCorrect: false }
    ],
    explanation: 'Pillar pain, which is pain and tenderness along the thenar and hypothenar eminences, is the most common complication after carpal tunnel release.',
    difficulty: 'medium',
    tags: ['Surgery', 'Orthopedics'],
    subject: 'Surgery',
    source: 'Clinical Practice',
    status: 'active',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '3',
    text: 'What is the first-line antibiotic treatment for community-acquired pneumonia in healthy adults?',
    options: [
      { id: '3a', text: 'Azithromycin', isCorrect: true },
      { id: '3b', text: 'Amoxicillin-clavulanate', isCorrect: false },
      { id: '3c', text: 'Ceftriaxone', isCorrect: false },
      { id: '3d', text: 'Levofloxacin', isCorrect: false }
    ],
    explanation: 'Azithromycin is recommended as first-line treatment for community-acquired pneumonia in otherwise healthy adults due to its coverage of typical and atypical pathogens.',
    difficulty: 'easy',
    tags: ['Internal Medicine', 'Infectious Disease'],
    subject: 'Internal Medicine',
    source: 'Guidelines',
    status: 'active',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  }
];

export const mockBanks: QuestionBank[] = [
  {
    id: '1',
    name: 'USMLE Step 1',
    description: 'Comprehensive question bank for USMLE Step 1',
    totalQuestions: 2500,
    subjects: ['Anatomy', 'Physiology', 'Biochemistry'],
    completion: 45,
    difficulty: 'advanced',
    lastUpdated: '2024-03-10T12:00:00Z'
  },
  {
    id: '2',
    name: 'Clinical Cases',
    description: 'Real-world clinical scenarios',
    totalQuestions: 1000,
    subjects: ['Internal Medicine', 'Surgery', 'Pediatrics'],
    completion: 30,
    difficulty: 'intermediate',
    lastUpdated: '2024-03-09T15:30:00Z'
  }
];