"use client";

import { useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ResumeUploader({ onAnalyze, isAnalyzing }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(droppedFile);
      } else {
        toast.error("Please upload a PDF or DOCX file.");
      }
    }
  };

  const clearFile = () => setFile(null);

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload a resume file.");
      return;
    }

    onAnalyze({ file });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/10 dark:bg-black/30 p-8 rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />
      
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 relative z-10">
        Upload Your Resume
      </h2>

      <div className="min-h-[200px] flex flex-col items-center justify-center">
        {!file ? (
          <div
            className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Upload className="text-blue-500 dark:text-blue-400" size={32} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-400 mt-2">
              PDF or DOCX (MAX. 5MB)
            </p>
          </div>
        ) : (
          <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-center justify-between border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <FileText
                  className="text-blue-600 dark:text-blue-300"
                  size={24}
                />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-[200px] sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>
      </div>
    </div>
  );
}
