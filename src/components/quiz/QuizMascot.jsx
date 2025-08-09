
import React from 'react';
import { motion } from 'framer-motion';
import {Sparkles } from 'lucide-react';

export default function QuizMascot({ expression = 'happy', message, size = 'md' }) {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32'
    };

    const expressions = {
        happy: '😊',
        excited: '🤩',
        thinking: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/92232a61a_ChatGPTImage8Aug202517_20_24.png',
        celebrating: '🎉'
    };

    const expressionContent = expressions[expression];
    const isImage = typeof expressionContent === 'string' && expressionContent.startsWith('http');

    return (
        <div className="flex flex-col items-center gap-3">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                className={`${sizeClasses[size]} bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden`}
            >
                {isImage ? (
                    <img src={expressionContent} alt={`${expression} mascot`} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl">{expressionContent}</span>
                )}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2"
                >
                    <Sparkles className="w-4 h-4 text-purple-500" />
                </motion.div>
            </motion.div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-100 relative max-w-xs"
                >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-purple-100 rotate-45"></div>
                    <p className="text-gray-700 text-sm font-medium text-center">{message}</p>
                </motion.div>
            )}
        </div>
    );
}
