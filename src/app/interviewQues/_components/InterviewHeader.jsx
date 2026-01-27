const InterviewHeader = ({ index, total }) => {
  const progress = ((index + 1) / total) * 100;

  return (
    <>
      <div className="bg-[#111827] p-5 rounded-lg">
        <h2 className="text-xl font-bold text-[#386bed]">
          Mock Interview Session
        </h2>
        <p className="text-gray-400 text-sm">
          Question {index + 1} of {total}
        </p>
      </div>

      <div className="h-3 bg-gray-700 rounded-full mt-3">
        <div
          className="h-full bg-gradient-to-r from-[#386bed] to-purple-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default InterviewHeader;
