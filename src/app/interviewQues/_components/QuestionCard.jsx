import { Volume2 } from "lucide-react";
import { textToSpeech } from "../_utils/textToSpeech";

const QuestionCard = ({ question }) => (
  <div className="bg-[#111827] p-6 rounded-xl">
    <Volume2
      className="text-[#386bed] cursor-pointer"
      onClick={() => textToSpeech(question.question)}
    />
    <h2 className="text-xl font-semibold mt-3">
      {question.question}
    </h2>
  </div>
);

export default QuestionCard;
