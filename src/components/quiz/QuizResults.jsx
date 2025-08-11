import React from 'react';
import { motion } from 'framer-motion';
// import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Button } from '@/components/ui/Button';
import { Share2, Download, RefreshCw, Sparkles } from 'lucide-react';
import QuizMascot from './QuizMascot';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Progress from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Cards';
// import { Card } from '../ui/Cards';

const PERSONALITY_DESCRIPTIONS = {
    'ENFJ': {
        title: 'The Inspiring Teacher',
        description: 'You are naturally drawn to helping others learn and grow. You excel at understanding what motivates people and creating supportive learning environments.',
        strengths: ['Excellent at group learning', 'Great at motivating others', 'Natural mentor', 'Emotionally intelligent'],
        challenges: ['May neglect own needs', 'Can be overwhelmed by others\' problems', 'May avoid difficult conversations'],
        tips: ['Take breaks to recharge', 'Practice saying no', 'Use visual aids in learning', 'Join study groups']
    },
    'INFJ': {
        title: 'The Insightful Learner',
        description: 'You prefer deep, meaningful learning experiences and excel at seeing connections between ideas.',
        strengths: ['Deep focus abilities', 'Great at synthesis', 'Creative problem solving', 'Independent learning'],
        challenges: ['May procrastinate on routine tasks', 'Perfectionist tendencies', 'Overwhelmed by too much stimulation'],
        tips: ['Create quiet study spaces', 'Use mind maps', 'Take regular breaks', 'Set realistic goals']
    },
    // Add more personality types as needed
};

const LEARNING_STYLE_DESCRIPTIONS = {
    visual: {
        title: 'Visual Learner',
        description: 'You learn best through seeing and visualizing information.',
        tips: ['Use colorful notes and diagrams', 'Watch educational videos', 'Create mind maps', 'Use flashcards with images'],
        icon: '👀'
    },
    auditory: {
        title: 'Auditory Learner',
        description: 'You learn best through listening and discussing.',
        tips: ['Listen to podcasts and audiobooks', 'Study with music', 'Join discussion groups', 'Read aloud'],
        icon: '👂'
    },
    kinesthetic: {
        title: 'Kinesthetic Learner',
        description: 'You learn best through hands-on activities and movement.',
        tips: ['Take breaks to move around', 'Use manipulatives', 'Act out concepts', 'Study while walking'],
        icon: '🤸'
    }
};

export default function QuizResults({ result, onRetakeQuiz, onSaveResult }) {
    const personalityInfo = PERSONALITY_DESCRIPTIONS[result.mbti_type] || PERSONALITY_DESCRIPTIONS['ENFJ'];
    const learningInfo = LEARNING_STYLE_DESCRIPTIONS[result.primary_learning_style];

    const personalityTraits = [
        { name: 'Extrovert', value: result.personality_scores.extrovert, opposite: 'Introvert', oppositeValue: result.personality_scores.introvert },
        { name: 'Intuitive', value: result.personality_scores.intuitive, opposite: 'Sensing', oppositeValue: result.personality_scores.sensing },
        { name: 'Feeling', value: result.personality_scores.feeling, opposite: 'Thinking', oppositeValue: result.personality_scores.thinking },
        { name: 'Judging', value: result.personality_scores.judging, opposite: 'Perceiving', oppositeValue: result.personality_scores.perceiving }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-br from-yellow-50 via-purple-50 to-pink-50 p-4"
        >
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Celebration Header */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center pt-8"
                >
                    <QuizMascot expression="celebrating" size="lg" />
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent mt-6 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        You are a {learningInfo.title}-{result.mbti_type} Learner!
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {personalityInfo.title} • {learningInfo.description}
                    </motion.p>
                </motion.div>

                {/* Learning Style Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="text-center">
                            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                                <Sparkles className="w-6 h-6 text-purple-500" />
                                Your Learning Style Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-6">
                                {Object.entries(result.learning_percentages).map(([style, percentage]) => {
                                    const styleInfo = LEARNING_STYLE_DESCRIPTIONS[style];
                                    const isMain = style === result.primary_learning_style;

                                    return (
                                        <motion.div
                                            key={style}
                                            whileHover={{ scale: 1.02 }}
                                            className={`text-center p-6 rounded-xl transition-all duration-200 ${isMain
                                                ? 'bg-gradient-to-br from-purple-100 to-yellow-100 border-2 border-purple-300'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="text-4xl mb-3">{styleInfo.icon}</div>
                                            <h3 className="font-bold text-lg mb-2 capitalize">{style} Learning</h3>
                                            <div className="text-3xl font-bold text-purple-600 mb-2">{percentage}%</div>
                                            <Progress value={percentage} className="mb-3" />
                                            {isMain && <Badge className="bg-yellow-400 text-gray-800">Primary Style</Badge>}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                {/* Personality Traits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Your Personality Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {personalityTraits.map((trait, index) => {
                                    const total = trait.value + trait.oppositeValue;
                                    const percentage = total > 0 ? (trait.value / total) * 100 : 50;
                                    const isStronger = trait.value > trait.oppositeValue;

                                    return (
                                        <div key={trait.name} className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span className={isStronger ? 'text-purple-600 font-bold' : 'text-gray-500'}>
                                                    {trait.name} ({trait.value})
                                                </span>
                                                <span className={!isStronger ? 'text-yellow-600 font-bold' : 'text-gray-500'}>
                                                    {trait.opposite} ({trait.oppositeValue})
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <Progress
                                                    value={percentage}
                                                    className="h-3"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Learning Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">Personalized Learning Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-bold text-green-600 mb-3 flex items-center gap-2">
                                        ✨ Your Strengths
                                    </h3>
                                    <ul className="space-y-2">
                                        {personalityInfo.strengths.map((strength, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">•</span>
                                                <span className="text-gray-700">{strength}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                                        💡 Learning Strategies
                                    </h3>
                                    <ul className="space-y-2">
                                        {learningInfo.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-blue-500 mt-1">•</span>
                                                <span className="text-gray-700">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="flex flex-wrap justify-center gap-4 pb-8"
                >
                    <Button
                        onClick={onSaveResult}
                        className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-xl"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Save Results
                    </Button>
                    <Button
                        onClick={onRetakeQuiz}
                        variant="outline"
                        className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-xl"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retake Quiz
                    </Button>
                    <Button
                        variant="outline"
                        className="border-2 border-yellow-300 text-yellow-600 hover:bg-yellow-50 font-bold py-3 px-6 rounded-xl"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Results
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}