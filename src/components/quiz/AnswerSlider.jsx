import React from 'react';
import { motion } from 'framer-motion';

export default function AnswerSlider({
    leftOption,
    rightOption,
    value,
    onChange,
    questionIndex
}) {
    const positions = [
        { value: -2, label: 'Strongly', side: 'left' },
        { value: -1, label: 'Slightly', side: 'left' },
        { value: 0, label: 'Equally', side: 'center' },
        { value: 1, label: 'Slightly', side: 'right' },
        { value: 2, label: 'Strongly', side: 'right' }
    ];

    const getButtonColor = (pos) => {
        if (pos.side === 'left') {
            return value === pos.value
                ? 'bg-yellow-400 text-gray-800 shadow-lg scale-110'
                : 'bg-yellow-100 hover:bg-yellow-200 text-gray-700';
        } else if (pos.side === 'right') {
            return value === pos.value
                ? 'bg-purple-400 text-white shadow-lg scale-110'
                : 'bg-purple-100 hover:bg-purple-200 text-gray-700';
        } else {
            return value === pos.value
                ? 'bg-gray-300 text-gray-800 shadow-lg scale-110'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600';
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Option Labels */}
            <div className="flex justify-between items-center mb-6 px-4">
                <div className="text-center max-w-xs">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-700 font-medium text-sm leading-tight">{leftOption}</p>
                </div>
                <div className="text-center max-w-xs">
                    <div className="w-4 h-4 bg-purple-400 rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-700 font-medium text-sm leading-tight">{rightOption}</p>
                </div>
            </div>

            {/* Slider Track */}
            <div className="relative mb-4">
                <div className="h-2 bg-gradient-to-r from-yellow-200 via-gray-100 to-purple-200 rounded-full"></div>
                {/* Active indicator */}
                {value !== null && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1/2 w-6 h-6 rounded-full shadow-lg transform -translate-y-1/2"
                        style={{
                            left: `${((value + 2) / 4) * 100}%`,
                            transform: `translateX(-50%) translateY(-50%)`,
                            backgroundColor: value < 0 ? '#FBBF24' : value > 0 ? '#A855F7' : '#9CA3AF'
                        }}
                    />
                )}
            </div>

            {/* Answer Buttons */}
            <div className="flex justify-between gap-2">
                {positions.map((pos) => (
                    <motion.button
                        key={pos.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onChange(pos.value)}
                        className={`
              flex-1 py-3 px-2 rounded-xl transition-all duration-200 text-xs font-medium
              ${getButtonColor(pos)}
              ${value === pos.value ? 'transform scale-105' : ''}
            `}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-bold">{pos.label}</span>
                            {pos.side !== 'center' && (
                                <span className="text-xs opacity-75">
                                    {pos.side === 'left' ? '👈' : '👉'}
                                </span>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}