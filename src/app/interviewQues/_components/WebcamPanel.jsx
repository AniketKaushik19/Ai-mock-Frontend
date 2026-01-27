import Webcam from "react-webcam";
import { WebcamIcon } from "lucide-react";

const WebcamPanel = ({ enabled, setEnabled }) => (
  <div className="bg-[#111827] p-1 rounded-xl h-[350px] flex items-center justify-center">
    {enabled ? (
      <Webcam
        mirrored
        onUserMedia={() => setEnabled(true)}
        onUserMediaError={() => setEnabled(false)}
        style={{
          height: 350,
          width: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
    ) : (
      <button
        onClick={() => setEnabled(true)}
        className="bg-white/10 px-6 py-3 rounded-lg"
      >
        Enable Camera
      </button>
    )}
  </div>
);

export default WebcamPanel;
