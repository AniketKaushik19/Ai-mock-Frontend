import SpeechRecognition from "react-speech-recognition";

const AnswerInput = ({
  value,
  setValue,
  setIsTyping,
  listening,
}) => (
  <div className="bg-gray-900/50 p-4 rounded-lg mt-4">
    <h3 className="text-xs text-gray-500 font-bold mb-2">
      Your Answer
    </h3>

    <textarea
      value={value}
      onChange={(e) => {
        setIsTyping(true);
        setValue(e.target.value);
        if (listening)
          SpeechRecognition.stopListening();
      }}
      onBlur={() => setIsTyping(false)}
      className="w-full min-h-[100px] bg-transparent text-gray-300 outline-none resize-none"
      placeholder="Speak or type your answer..."
    />
  </div>
);

export default AnswerInput;
