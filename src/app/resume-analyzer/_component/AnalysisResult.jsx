import { motion } from "framer-motion";

/* ===================== MAIN ===================== */

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const {
    atsScore = 0,
    summary = "",
    strengths = [],
    weaknesses = [],
    improvementSuggestions = [],
    missingSkills = [],
  } = result;

  return (
    <div className="grid gap-10">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CIRCULAR ATS */}
        <GlassCard className="md:col-span-1 flex items-center justify-center">
          <CircularScore score={atsScore} />
        </GlassCard>

        {/* SUMMARY */}
        <GlassCard className="md:col-span-2">
          <h2 className="section-title">AI Summary</h2>
          <p className="text-gray-300 leading-relaxed mt-3">
            {summary}
          </p>
        </GlassCard>
      </div>

      {/* STRENGTHS / WEAKNESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DiagramList
          title="Strengths"
          items={strengths}
          gradient="from-green-400 to-emerald-500"
        />

        <DiagramList
          title="Weaknesses"
          items={weaknesses}
          gradient="from-red-400 to-pink-500"
        />
      </div>

      {/* IMPROVEMENTS */}
      <DiagramList
        title="Improvement Suggestions"
        items={improvementSuggestions}
        gradient="from-blue-400 to-cyan-500"
      />

      {/* SKILLS */}
      <SkillOrbit skills={missingSkills} />
    </div>
  );
}

/* ===================== UI BLOCKS ===================== */

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(99,102,241,0.15)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ===================== CIRCULAR ATS ===================== */

function CircularScore({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <svg
        width="180"
        height="180"
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          fill="none"
        />

        {/* Progress circle */}
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">
          {score}
        </span>
        <span className="text-xs tracking-widest text-gray-400 mt-1">
          ATS SCORE
        </span>
      </div>
    </div>
  );
}



function DiagramList({ title, items, gradient }) {
  if (!items || items.length === 0) return null;

  return (
    <GlassCard>
      <h2 className="section-title mb-5">{title}</h2>

      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4"
          >
            <span
              className={`w-2 h-2 mt-2 rounded-full bg-gradient-to-r ${gradient}`}
            />
            <p className="text-gray-300">{item}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}



function SkillOrbit({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <GlassCard>
      <h2 className="section-title mb-6">Missing Skills</h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.15 }}
            className="px-5 py-2 rounded-full text-sm font-medium
                       bg-gradient-to-r from-purple-500/30 to-indigo-500/30
                       border border-purple-400/30 text-purple-200
                       shadow-[0_0_20px_rgba(168,85,247,0.35)]"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </GlassCard>
  );
}

/* ===================== UTIL ===================== */

const sectionTitleStyle =
  "text-lg font-semibold tracking-wide text-white";

function SectionTitle({ children }) {
  return <h2 className={sectionTitleStyle}>{children}</h2>;
}

/* Tailwind helper */
const styles = `
.section-title {
  @apply text-lg font-semibold tracking-wide text-white;
}
`;
