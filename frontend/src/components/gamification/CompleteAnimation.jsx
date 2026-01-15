
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';

const CompleteAnimation = ({ show, challenge, onClose }) => {
    const { user } = useGame();

    useEffect(() => {
        if (show) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-[#1a1a1a] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-gray-800 overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Success Header */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="bg-green-500 rounded-full p-1">
                                <CheckCircle2 size={16} className="text-white bg-green-500 rounded-full" />
                            </div>
                            <h2 className="text-lg font-bold text-white tracking-wide">
                                {challenge?.type === 'daily' ? 'Daily' : 'Weekly'} Challenge Completed!
                            </h2>
                        </div>

                        {/* Streak Info */}
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Completion Streak: <span className="text-blue-500">{user?.streak || 1} Days</span>
                            </h3>
                            <p className="text-gray-400 text-sm font-medium">
                                Consistency is key, see you tomorrow!
                            </p>
                        </div>

                        {/* Coin Animation */}
                        <div className="h-40 flex items-center justify-center mt-6 mb-2">
                            <div className="relative w-24 h-24">
                                <motion.div
                                    animate={{ rotateY: 360 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: "linear"
                                    }}
                                    className="w-full h-full"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Coin Visual - CSS implementation of a Gold Coin */}
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg flex items-center justify-center border-4 border-yellow-600 relative">
                                        {/* Inner Ring */}
                                        <div className="w-[85%] h-[85%] rounded-full border-2 border-yellow-300/50 flex items-center justify-center bg-yellow-500">
                                            {/* Logo/Icon */}
                                            <span className="text-4xl font-black text-yellow-100 drop-shadow-md">
                                                $
                                            </span>
                                        </div>
                                        {/* Shine effect */}
                                        <div className="absolute top-2 left-4 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CompleteAnimation;