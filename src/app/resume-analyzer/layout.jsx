"use client";

import { ThemeProvider, useTheme } from "./_context/ThemeContext";
import { useEffect, useState } from "react";

function ThemeWrapper({ children }) {
  const { theme, mounted } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (!mounted) return;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setResolvedTheme(systemTheme);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme, mounted]);

  // Prevent hydration mismatch by not rendering theme class until mounted
  if (!mounted) return <div className="invisible">{children}</div>;

  return (
    <div className={`${resolvedTheme} min-h-screen w-full transition-colors duration-300`}>
       <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
          {children}
       </div>
    </div>
  );
}

export default function ResumeAnalyzerLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="resume-theme">
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </ThemeProvider>
  );
}
