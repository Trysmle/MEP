import React from 'react';
import { CheckCircle, XCircle, Clock, Brain, ArrowRight, Download } from 'lucide-react';
import { Question } from '../types';

interface ExamResultsProps {
  questions: Question[];
  answers: Record<string, string>;
  timeSpent: number;
  onRetry: () => void;
  onClose: () => void;
  onViewAllQuestions: () => void;
}

export default function ExamResults({ 
  questions, 
  answers, 
  timeSpent,
  onRetry,
  onClose,
  onViewAllQuestions
}: ExamResultsProps) {
  const correctAnswers = questions.filter(q => {
    const selectedOption = q.options.find(o => o.id === answers[q.id]);
    return selectedOption?.isCorrect;
  }).length;

  const accuracy = (correctAnswers / questions.length) * 100;
  const averageTimePerQuestion = Math.round(timeSpent / questions.length);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleDownloadReport = () => {
    const report = {
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      correctAnswers,
      accuracy: `${Math.round(accuracy)}%`,
      timeSpent: formatTime(timeSpent),
      averageTimePerQuestion: `${averageTimePerQuestion}s`,
      questions: questions.map(q => ({
        question: q.text,
        selectedAnswer: q.options.find(o => o.id === answers[q.id])?.text || 'Not answered',
        correctAnswer: q.options.find(o => o.isCorrect)?.text,
        isCorrect: q.options.find(o => o.id === answers[q.id])?.isCorrect
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Quiz Results</h1>
            <p className="text-gray-600 mt-2">Great job completing the quiz!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">Accuracy</p>
                  <p className="text-3xl font-bold text-indigo-900 mt-1">
                    {Math.round(accuracy)}%
                  </p>
                </div>
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-sm text-indigo-700 mt-2">
                {correctAnswers} out of {questions.length} correct
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Time Spent</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">
                    {formatTime(timeSpent)}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-green-700 mt-2">
                {averageTimePerQuestion}s per question
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Performance</p>
                  <p className="text-3xl font-bold text-purple-900 mt-1">
                    {accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : 'Keep Practicing'}
                  </p>
                </div>
                {accuracy >= 80 ? (
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                ) : (
                  <Brain className="h-8 w-8 text-purple-600" />
                )}
              </div>
              <p className="text-sm text-purple-700 mt-2">
                {accuracy >= 80 ? 'Outstanding work!' : 'Room for improvement'}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Review</h2>
            <div className="space-y-4">
              {questions.slice(0, 3).map((question) => {
                const selectedOption = question.options.find(o => o.id === answers[question.id]);
                const isCorrect = selectedOption?.isCorrect;

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{question.text}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className={`flex items-center ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 mr-1" />
                            ) : (
                              <XCircle className="h-5 w-5 mr-1" />
                            )}
                            {selectedOption?.text}
                          </span>
                        </div>
                      </div>
                      {!isCorrect && (
                        <div className="ml-4 text-sm text-green-600">
                          <p className="font-medium">Correct Answer:</p>
                          <p>{question.options.find(o => o.isCorrect)?.text}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={onViewAllQuestions}
              className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
            >
              View all questions
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-x-4">
              <button onClick={onRetry} className="btn-secondary">
                Try Again
              </button>
              <button 
                onClick={handleDownloadReport}
                className="btn-secondary flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
            </div>
            <button onClick={onClose} className="btn-primary">
              Back to Question Bank
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}