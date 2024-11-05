import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Questions = ({ handleCompletion }) => {
    const [step, setStep] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Questions array
    const questions = [
        "Have you been diagnosed with hypertension by a healthcare provider?",
        "Do you have a home blood pressure monitor?",
        "How often do you check your blood pressure at home?"
    ];

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            if (step < questions.length) {
                setStep(step + 1);
                setSelectedAnswer(null);
            } else {
                handleCompletion(); // Call the completion callback when the last question is reached
            }
        }
    };

    return (
        <div className="lg:w-[50%] sm:w-full bg-white sm:py-10 sm:px-3 lg:px-0 lg:py-0">
            <div className="w-full sm:p-5 lg:p-10">
                <div className="flex flex-row items-center justify-between mb-3">
                    <h2 className="capitalize font-bold">Question {step}/{questions.length}</h2>
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                        className={`text-neutral-50 font-bold capitalize flex flex-row items-center gap-x-3 ${!selectedAnswer ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        <span>Next</span>
                        <MdKeyboardArrowRight />
                    </button>
                </div>
                <div className="bg-neutral-50 rounded-lg flex flex-col items-center justify-center mb-10 py-20 mx-auto">
                    <p className="font-semibold first-letter:capitalize leading-relaxed tracking-wide">
                        {questions[step - 1]}
                    </p>
                </div>

                {/* Answer options */}
                <div
                    className={`border-2 border-neutral-100 text-center w-full p-3 rounded-lg capitalize mb-3 cursor-pointer ${selectedAnswer === 'yes' ? 'bg-primary-100 text-white' : ''}`}
                    onClick={() => handleAnswer('yes')}
                >
                    Yes
                </div>
                <div
                    className={`border-2 border-neutral-100 text-center w-full p-3 rounded-lg capitalize mb-3 cursor-pointer ${selectedAnswer === 'no' ? 'bg-primary-100 text-white' : ''}`}
                    onClick={() => handleAnswer('no')}
                >
                    No
                </div>
            </div>
        </div>
    );
};

export default Questions;
