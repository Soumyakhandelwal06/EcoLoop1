import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Header from '../components/common/Header';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from '../components/level/VideoPlayer';
import QuizInterface from '../components/level/QuizInterface';
import TaskUpload from '../components/level/TaskUpload';
import SuccessModal from '../components/common/SuccessModal';

const LevelView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { levels, updateProgress } = useGame();
    const [levelData, setLevelData] = useState(null);
    const [step, setStep] = useState('video'); // video, info, quiz, task, completed
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (levels.length > 0) {
            // Find level data matching ID (ensure type safety)
            const found = levels.find(l => l.id === parseInt(id));
            if (found) {
                setLevelData(found);
            }
        }
    }, [levels, id]);

    const handleVideoComplete = async () => {
        // Award 10 Coins for watching video (not level completion)
        const success = await updateProgress(levelData.id, 10, 0, false);
        if (success) {
            // Optional: Toast notification here if desired
            console.log("Video Reward: +10 Coins");
        }
        setStep('info');
    };
    const handleInfoRead = () => setStep('quiz');

    const handleCorrectAnswer = async () => {
        // Award 5 Coins per correct answer (not level completion)
        await updateProgress(levelData.id, 5, 0, false);
    };

    const handleQuizPass = () => setStep('task');
    const handleTaskVerified = async () => {
        if (levelData) {
            // Award 20 Coins for Task + XP Reward + Mark Level Completed
            const success = await updateProgress(levelData.id, 20, levelData.xp_reward, true);
            if (success) {
                setShowSuccess(true);
            } else {
                alert("Failed to save progress. Please try again.");
            }
        }
    };

    if (!levelData) {
        return (
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                <p className="text-xl font-bold text-green-800 animate-pulse">Loading Level Data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-green-50 pb-20">
            <Header />

            <main className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="mt-6 flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="mb-8 text-center pt-8">
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
                        Level {id}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-800 mt-4">{levelData.title}</h1>
                    <p className="text-gray-600 mt-2">{levelData.description}</p>

                    {/* Progress Steps */}
                    <div className="flex justify-center mt-6 gap-2">
                        {['Video 🎥', 'Info ℹ️', 'Quiz ❓', 'Task 📸'].map((label, idx) => {
                            const steps = ['video', 'info', 'quiz', 'task'];
                            const isActive = step === steps[idx];
                            const isDone = steps.indexOf(step) > idx;

                            // Allow clicking if it's the current step or a step already completed
                            const currentIdx = steps.indexOf(step);
                            let isReachable = idx <= currentIdx;

                            // Allow access to Info even if on Video step
                            if (step === 'video' && steps[idx] === 'info') isReachable = true;
                            // Allow access to Video if on Info step (though usually allowed by idx check, ensuring it matches 2-way)
                            if (step === 'info' && steps[idx] === 'video') isReachable = true;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => isReachable && setStep(steps[idx])}
                                    disabled={!isReachable}
                                    className={`px-4 py-2 rounded-lg font-bold transition-all
                                        ${isActive
                                            ? 'bg-green-600 text-white scale-110 shadow'
                                            : isReachable
                                                ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 hover:shadow-md'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 transition-all duration-500 ease-in-out">
                    {step === 'video' && <VideoPlayer onComplete={handleVideoComplete} levelData={levelData} />}
                    {step === 'info' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-green-100/50">
                            <h2 className="text-3xl font-black text-green-900 mb-6 flex items-center gap-2">
                                <span className="text-4xl">📝</span> Key Takeaways
                            </h2>
                            <div className="prose prose-2xl text-gray-700 mb-8 max-w-none">
                                <p className="leading-loose whitespace-pre-line font-medium text-2xl">
                                    {levelData.info_content || "Watch the video closely to understand the key concepts!"}
                                </p>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg my-4">
                                    <p className="font-bold text-yellow-800 m-0">
                                        💡 Ready? The quiz will test your knowledge on these topics!
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleInfoRead}
                                className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
                            >
                                Start Quiz ❓
                            </button>
                        </div>
                    )}
                    {step === 'quiz' && <QuizInterface onPass={handleQuizPass} onCorrectAnswer={handleCorrectAnswer} questions={levelData.questions} />}
                    {step === 'task' && <TaskUpload onSuccess={handleTaskVerified} taskDescription={levelData.task_description} taskType="Level Challenge" levelId={levelData.id} />}
                </div>

                <SuccessModal 
                    isOpen={showSuccess}
                    onClose={() => navigate('/dashboard')}
                    xpReward={levelData.xp_reward}
                    coinReward={20}
                />
            </main>
        </div>
    );
};

export default LevelView;
