import React from 'react';
import { motion } from 'framer-motion';
import Progress from '../ui/progress';
// import { Progress } from '@/components/ui/progress';

export default function QuizProgress({ currentQuestion, totalQuestions }) {
    const percentage = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion} of {totalQuestions}
                </span>
                <span className="text-sm font-bold text-purple-600">
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="relative">
                <Progress
                    value={percentage}
                    className="h-3 bg-purple-100"
                />
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2"
                >
                    <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs text-white font-bold">🎯</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}