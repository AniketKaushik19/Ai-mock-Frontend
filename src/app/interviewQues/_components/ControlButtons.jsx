import { Mic, StopCircle } from "lucide-react";

const ControlButtons = ({
  listening,
  onRecord,
  onNext,
  onEnd,
  isLast,
}) => (
  <div className="flex gap-3 mt-4">
    <button
      onClick={onRecord}
      className={`flex-1 py-3 rounded-lg font-bold flex justify-center gap-2 ${
        listening
          ? "bg-red-500 animate-pulse"
          : "bg-[#386bed]"
      }`}
    >
      {listening ? <StopCircle /> : <Mic />}
      {listening ? "Stop" : "Record"}
    </button>

    {isLast ? (
      <button
        onClick={onEnd}
        className="bg-red-500/10 border border-red-500 px-4 rounded-lg"
      >
        End Interview
      </button>
    ) : (
      <button
        onClick={onNext}
        className="bg-[#111827] border border-white/10 px-6 rounded-lg"
      >
        Next
      </button>
    )}
  </div>
);

export default ControlButtons;
