import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import QuizResults from '../components/quiz/QuizResults';
import QuizMascot from '../components/quiz/QuizMascot';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Cards';
import { ArrowLeft, ArrowRight, Play, Star } from 'lucide-react';
import QuizProgress from '../components/quiz/QuizProgress';
import AnswerSlider from '../components/quiz/AnswerSlider';
import { Badge } from '../components/ui/badge';





const QUIZ_QUESTIONS = [
    { question: "You find yelling to be", left: "Difficult", right: "Natural", dimension: "introvert_extrovert", leftTrait: "introvert", rightTrait: "extrovert" },
    { question: "You relax by", left: "Listening to music", right: "Doing physical activities", dimension: "learning_style", leftTrait: "auditory", rightTrait: "kinesthetic" },
    { question: "You like teaching others by", left: "Speaking with them", right: "Showing them how", dimension: "extrovert_visual", leftTrait: "extrovert", rightTrait: "visual" },
    { question: "You are", left: "Energetic", right: "Mellow", dimension: "introvert_extrovert", leftTrait: "extrovert", rightTrait: "introvert" },
    { question: "You prefer to", left: "Talk", right: "Listen", dimension: "introvert_extrovert", leftTrait: "extrovert", rightTrait: "introvert" },
    { question: "You tend to", left: "Accept things", right: "Be unsatisfied", dimension: "perceiving_judging", leftTrait: "perceiving", rightTrait: "judging" },
    { question: "You focus on", left: "Who? What? When?", right: "Why?", dimension: "sensing_intuitive", leftTrait: "sensing", rightTrait: "intuitive" },
    { question: "You prefer to", left: "Keep options open", right: "Commit", dimension: "perceiving_judging", leftTrait: "perceiving", rightTrait: "judging" },
    { question: "Your workspace tends to be", left: "Clean", right: "Messy", dimension: "perceiving_judging", leftTrait: "judging", rightTrait: "perceiving" },
    { question: "You're more focused on", left: "The present", right: "The future", dimension: "sensing_intuitive", leftTrait: "sensing", rightTrait: "intuitive" },
    { question: "When working on assignments, you", left: "Get them done early", right: "Procrastinate", dimension: "perceiving_judging", leftTrait: "judging", rightTrait: "perceiving" },
    { question: "You tend to", left: "Improvise", right: "Prepare beforehand", dimension: "perceiving_judging", leftTrait: "perceiving", rightTrait: "judging" },
    { question: "You prefer learning", left: "At home", right: "With others", dimension: "introvert_extrovert", leftTrait: "introvert", rightTrait: "extrovert" },
    { question: "You tend to plan", left: "Far ahead", right: "Last minute", dimension: "perceiving_judging", leftTrait: "judging", rightTrait: "perceiving" },
    { question: "You follow", left: "Your heart", right: "Your head", dimension: "feeling_thinking", leftTrait: "feeling", rightTrait: "thinking" },
    { question: "You want people's", left: "Respect", right: "Love", dimension: "feeling_thinking", leftTrait: "thinking", rightTrait: "feeling" },
    { question: "First thing with a new device", left: "Read instructions", right: "Try it out", dimension: "sensing_intuitive", leftTrait: "sensing", rightTrait: "intuitive" },
    { question: "You prefer to", left: "Make lists", right: "Rely on memory", dimension: "perceiving_judging", leftTrait: "judging", rightTrait: "perceiving" },
    { question: "Emotions are", left: "Uncomfortable", right: "Valuable", dimension: "feeling_thinking", leftTrait: "thinking", rightTrait: "feeling" },
    { question: "You remember better if you", left: "Write it down", right: "Hear it", dimension: "learning_style", leftTrait: "visual", rightTrait: "auditory" },
    { question: "You focus better when you", left: "Look at them", right: "Close your eyes", dimension: "learning_style", leftTrait: "visual", rightTrait: "auditory" },
    { question: "Public speaking", left: "You enjoy it", right: "You avoid it", dimension: "introvert_extrovert", leftTrait: "extrovert", rightTrait: "introvert" },
    { question: "You are", left: "Chaotic", right: "Organized", dimension: "perceiving_judging", leftTrait: "perceiving", rightTrait: "judging" },
    { question: "When describing an event", left: "What happened", right: "What it meant", dimension: "sensing_intuitive", leftTrait: "sensing", rightTrait: "intuitive" },
    { question: "You fix problems by", left: "Talking it out", right: "Trying solutions", dimension: "feeling_thinking", leftTrait: "feeling", rightTrait: "thinking" },
    { question: "You like to", left: "Work hard", right: "Play hard", dimension: "perceiving_judging", leftTrait: "judging", rightTrait: "perceiving" },
    { question: "Getting bearings in a new city", left: "Use a map", right: "Walk around", dimension: "learning_style", leftTrait: "visual", rightTrait: "kinesthetic" },
    { question: "You prefer to", left: "Fit in", right: "Stand out", dimension: "feeling_thinking", leftTrait: "feeling", rightTrait: "thinking" },
    { question: "Parties are", left: "Exhausting", right: "Invigorating", dimension: "introvert_extrovert", leftTrait: "introvert", rightTrait: "extrovert" },
    { question: "You tend to be", left: "Theoretical", right: "Empirical", dimension: "sensing_intuitive", leftTrait: "intuitive", rightTrait: "sensing" },
    { question: "You learn best when", left: "Moving around", right: "Sitting still", dimension: "learning_style", leftTrait: "kinesthetic", rightTrait: "visual" },
    { question: "You process information by", left: "Discussing it", right: "Writing about it", dimension: "learning_style", leftTrait: "auditory", rightTrait: "visual" },
    { question: "When studying, you prefer", left: "Background noise", right: "Complete silence", dimension: "learning_style", leftTrait: "auditory", rightTrait: "visual" }
];

export default function Quiz() {
    const [quizState, setQuizState] = useState('welcome'); // welcome, taking, results
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(new Array(QUIZ_QUESTIONS.length).fill(null));
    const [quizResult, setQuizResult] = useState(null);

    const handleStartQuiz = () => {
        setQuizState('taking');
        setCurrentQuestion(0);
        setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    };
    <Button />

    const handleAnswerChange = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResults();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const calculateResults = () => {
        // Initialize scores
        const scores = {
            introvert: 0, extrovert: 0,
            sensing: 0, intuitive: 0,
            thinking: 0, feeling: 0,
            judging: 0, perceiving: 0,
            visual: 0, auditory: 0, kinesthetic: 0
        };

        // Calculate scores based on answers
        answers.forEach((answer, index) => {
            if (answer === null) return;

            const question = QUIZ_QUESTIONS[index];

            if (answer < 0) {
                // Left side chosen
                scores[question.leftTrait] += Math.abs(answer);
            } else if (answer > 0) {
                // Right side chosen
                scores[question.rightTrait] += answer;
            }
            // If answer === 0, no points added
        });

        // Determine MBTI type
        const mbtiType =
            (scores.extrovert > scores.introvert ? 'E' : 'I') +
            (scores.intuitive > scores.sensing ? 'N' : 'S') +
            (scores.thinking > scores.feeling ? 'T' : 'F') +
            (scores.judging > scores.perceiving ? 'J' : 'P');

        // Determine primary learning style
        const learningStyles = { visual: scores.visual, auditory: scores.auditory, kinesthetic: scores.kinesthetic };
        const primaryStyle = Object.keys(learningStyles).reduce((a, b) => learningStyles[a] > learningStyles[b] ? a : b);

        // Calculate percentages for learning styles
        const totalLearning = scores.visual + scores.auditory + scores.kinesthetic;
        const learningPercentages = {
            visual: totalLearning > 0 ? Math.round((scores.visual / totalLearning) * 100) : 33,
            auditory: totalLearning > 0 ? Math.round((scores.auditory / totalLearning) * 100) : 33,
            kinesthetic: totalLearning > 0 ? Math.round((scores.kinesthetic / totalLearning) * 100) : 34
        };

        const result = {
            mbti_type: mbtiType,
            personality_scores: {
                extrovert: scores.extrovert,
                introvert: scores.introvert,
                sensing: scores.sensing,
                intuitive: scores.intuitive,
                thinking: scores.thinking,
                feeling: scores.feeling,
                judging: scores.judging,
                perceiving: scores.perceiving
            },
            learning_style_scores: {
                visual: scores.visual,
                auditory: scores.auditory,
                kinesthetic: scores.kinesthetic
            },
            primary_learning_style: primaryStyle,
            learning_percentages: learningPercentages,
            quiz_answers: answers,
            completion_date: new Date().toISOString()
        };

        setQuizResult(result);
        setQuizState('results');
    };

    const handleRetakeQuiz = () => {
        setQuizState('welcome');
        setCurrentQuestion(0);
        setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
        setQuizResult(null);
    };

    const handleSaveResult = async () => {
        try {
            await QuizResults.create(quizResult);
            // Could show a success message here
        } catch (error) {
            console.error('Error saving quiz result:', error);
        }
    };

    if (quizState === 'results') {
        return (
            <QuizResults
                result={quizResult}
                onRetakeQuiz={handleRetakeQuiz}
                onSaveResult={handleSaveResult}
            />
        );
    }

    if (quizState === 'welcome') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <QuizMascot
                        expression="excited"
                        size="lg"
                        message="Ready to discover your unique learning style?"
                    />

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent mt-8 mb-6"
                    >
                        Learning Style Discovery Quiz
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                            <CardContent className="p-8">
                                <div className="space-y-4 text-gray-700">
                                    <div className="flex items-center gap-3 text-lg">
                                        <Star className="w-6 h-6 text-yellow-500" />
                                        <span>Discover your unique personality type and learning style</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        <Star className="w-6 h-6 text-purple-500" />
                                        <span>Get personalized tips to supercharge your learning</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-lg">
                                        <Star className="w-6 h-6 text-pink-500" />
                                        <span>Just {QUIZ_QUESTIONS.length} fun questions - takes 5 minutes!</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
            <Badge/>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={handleStartQuiz}
                                size="lg"
                                className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-xl"
                            >
                                <Play className="w-6 h-6 mr-3" />
                                Start Your Discovery Journey!
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    // Taking quiz state
    const currentQ = QUIZ_QUESTIONS[currentQuestion];
    const canProceed = answers[currentQuestion] !== null;
    const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 p-4">
            <div className="max-w-4xl mx-auto pt-8">

                <QuizProgress
                    currentQuestion={currentQuestion + 1}
                    totalQuestions={QUIZ_QUESTIONS.length}
                />

                <div className="flex justify-center mb-8">
                    <QuizMascot
                        expression="thinking"
                        message="Take your time and choose what feels most like you!"
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 mb-8">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    {currentQ.question}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                <AnswerSlider
                                    leftOption={currentQ.left}
                                    rightOption={currentQ.right}
                                    value={answers[currentQuestion]}
                                    onChange={handleAnswerChange}
                                    questionIndex={currentQuestion}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <Button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full">
                            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                        </span>
                    </div>

                    <Button
                        onClick={handleNextQuestion}
                        disabled={!canProceed}
                        className={`
              flex items-center gap-2 font-bold py-2 px-6 rounded-xl transition-all duration-200
              ${canProceed
                                ? 'bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }
            `}
                    >
                        {isLastQuestion ? 'See Results' : 'Next'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}