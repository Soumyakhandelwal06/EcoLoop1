import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const QuizInterface = ({ onPass, onCorrectAnswer, questions = [] }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fallback if no questions
  const activeQuestions = questions.length > 0 ? questions : [
    { text: "No questions loaded from backend.", options: "Error", correct_index: 0, difficulty: 1 }
  ];

  const currentQuestionData = activeQuestions[currentQ];
  const optionsArray = currentQuestionData.options.split('|');

  const handleSelect = (index) => {
    setSelected(index);
    setShowResult(true);
    if (index === currentQuestionData.correct_index) {
      setScore(score + 1);
      if (onCorrectAnswer) {
        onCorrectAnswer();
      }
    }
  };

  const nextQuestion = () => {
    if (currentQ < activeQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Re-calculate pass status based on final score (Need > 60%)
  const passed = score >= Math.ceil(activeQuestions.length * 0.6);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full mx-auto">
      {!quizFinished ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 font-bold">Question {currentQ + 1}/{activeQuestions.length}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Score: {score}</span>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentQuestionData.text}</h3>
          <div className="mb-6 flex gap-2">
            {[...Array(currentQuestionData.difficulty || 1)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
            <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 ml-1">Difficulty</span>
          </div>

          <div className="space-y-4">
            {optionsArray.map((opt, idx) => {
              let btnClass = "w-full p-4 rounded-xl border-2 text-left font-bold transition flex justify-between items-center ";
              if (showResult) {
                if (idx === currentQuestionData.correct_index) btnClass += "bg-green-100 border-green-500 text-green-800";
                else if (idx === selected) btnClass += "bg-red-100 border-red-500 text-red-800";
                else btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
              } else {
                btnClass += "bg-white border-gray-200 hover:border-green-400 hover:bg-green-50 text-gray-700";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleSelect(idx)}
                  className={btnClass}
                  disabled={showResult}
                >
                  {opt}
                  {showResult && idx === currentQuestionData.correct_index && <CheckCircle className="text-green-600" />}
                  {showResult && idx === selected && idx !== currentQuestionData.correct_index && <XCircle className="text-red-600" />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={nextQuestion}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
              >
                {currentQ === activeQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          {passed ? (
            <div className="animate-bounce mb-6 text-6xl">🏆</div>
          ) : (
            <div className="mb-6 text-6xl">😢</div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {passed ? "Quiz Passed!" : "Try Again!"}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {activeQuestions.length}
          </p>

          <button
            onClick={() => passed ? onPass() : window.location.reload()}
            className={`px-10 py-4 rounded-xl font-bold text-xl shadow-lg transition transform hover:scale-105 ${passed ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-800 text-white'}`}
          >
            {passed ? "Next: Eco Task 📸" : "Retry Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};


export default QuizInterface;
