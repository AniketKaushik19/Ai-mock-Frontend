export const analyzeResume = async (data) => {
  // This function simulates the backend API call.
  // In the future, Replace this with a real API call
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response data
  return {
    score: 85,
    strengths: [
      "Strong use of action verbs",
      "Quantifiable achievements in experience",
      "Clean formatting and structure",
      "Good use of relevant keywords"
    ],
    weaknesses: [
      "Summary could be more impactful",
      "Missing link to portfolio or LinkedIn",
      "Skills section could be more specific"
    ],
    keywords: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "Frontend Development"
    ]
  };
};
