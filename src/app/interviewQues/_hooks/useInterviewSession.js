import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "sonner";
import { saveAnswer } from "../_utils/answerHelpers";

export const useInterviewSession = (questions) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const activeQuestion = questions[activeIndex];

  useEffect(() => {
    if (transcript && !isTyping) {
      setUserAnswer(transcript);
    }
  }, [transcript, isTyping]);

  const recordToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      persistAnswer();
      toast.success("Answer recorded");
    } else {
      setUserAnswer("");
      setIsTyping(false);
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  };

  const persistAnswer = () => {
    setAnswers((prev) =>
      saveAnswer({
        answers: prev,
        question: activeQuestion,
        answer: userAnswer || transcript || "",
      })
    );
  };

  const goToQuestion = (index) => {
    if (listening) SpeechRecognition.stopListening();
    persistAnswer();

    setActiveIndex(index);
    setUserAnswer(
      getAnswerByQuestionId(answers, questions[index].id)
    );
    resetTranscript();
  };

  return {
    activeIndex,
    activeQuestion,
    answers,
    userAnswer,
    setUserAnswer,
    setIsTyping,
    listening,
    browserSupportsSpeechRecognition,
    recordToggle,
    goToQuestion,
    persistAnswer,
  };
};
