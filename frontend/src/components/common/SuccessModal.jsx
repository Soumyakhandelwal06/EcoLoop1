import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Trophy, Star, Coins, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const SuccessModal = ({ isOpen, onClose, xpReward, coinReward, title = "Level Completed!" }) => {
    useEffect(() => {
        if (isOpen) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        className="bg-white rounded-[40px] shadow-2xl max-w-md w-full overflow-hidden relative"
                    >
                        {/* Top Decoration */}
                        <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center relative">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-4 rounded-full shadow-xl"
                            >
                                <Trophy className="w-12 h-12 text-yellow-500" />
                            </motion.div>
                        </div>

                        <div className="p-8 text-center">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-black text-gray-800 mb-2"
                            >
                                {title}
                            </motion.h2>
                            <p className="text-gray-500 font-medium mb-8">You're making a real difference! 🌍</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-purple-50 p-4 rounded-3xl border border-purple-100"
                                >
                                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                    <span className="block text-2xl font-black text-purple-700">+{xpReward}</span>
                                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">XP Gained</span>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-yellow-50 p-4 rounded-3xl border border-yellow-100"
                                >
                                    <Coins className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                                    <span className="block text-2xl font-black text-yellow-700">+{coinReward}</span>
                                    <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">EcoCoins</span>
                                </motion.div>
                            </div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={onClose}
                                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-200 transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Continue to Dashboard <ArrowRight size={20} />
                            </motion.button>
                        </div>

                        {/* Success Icon Badge */}
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
                            <CheckCircle className="text-white w-6 h-6" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
