"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGenerateQuestion } from "@/hooks/interview";
import Loading from "@/app/_component/Loading";
import { useRouter } from "next/navigation";

export default function CreateInterviewModal({ open, setOpen }) {
  const router = useRouter();
  const [form, setForm] = useState({
    jobRole: "",
    jobDescription: "",
    techStack: "",
    yearsOfExperience: "",
    numberOfQuestions: 5,
  });

  const { mutateAsync, isPending } = useGenerateQuestion();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {

    const result = await mutateAsync(form);



    setOpen(false);
    if (result) {
      router.push(`/startInterview/${result.interviewId}`);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-Secondary text-white border border-white/10 max-w-lg w-[95vw]">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">
              Tell us more about your job interviewing
            </DialogTitle>
            <p className="text-xs text-[#CBD5E1]">
              Add details about your role and experience
            </p>
          </DialogHeader>

          <div className="mt-4 space-y-4">

            <div>
              <label className="text-xs text-[#CBD5E1]">Job Role</label>
              <Input
                name="jobRole"
                placeholder="Full Stack Developer"
                value={form.jobRole}
                onChange={handleChange}
                className="mt-1 bg-Primary border-white/10 text-white h-9"
              />
            </div>

            <div>
              <label className="text-xs text-[#CBD5E1] flex items-center gap-1">
                Job Description
                <span className="text-[10px] text-[#94A3B8]">(Optional)</span>
              </label>
              <Textarea
                name="jobDescription"
                placeholder="Optional"
                value={form.jobDescription}
                onChange={handleChange}
                className="mt-1 bg-Primary border-white/10 text-white min-h-15"
              />
            </div>


            <div>
              <label className="text-xs text-[#CBD5E1]">Tech Stack</label>
              <Textarea
                name="techStack"
                placeholder="React, Node.js"
                value={form.techStack}
                onChange={handleChange}
                className="mt-1 bg-Primary border-white/10 text-white min-h-15"
              />
            </div>


            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-xs text-[#CBD5E1]">Experience</label>
                <Input
                  name="yearsOfExperience"
                  type="number"
                  placeholder="3"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  className="mt-1 bg-Primary border-white/10 text-white h-9"
                />
              </div>

              <div className="relative flex flex-col justify-center">
                <label className="text-xs text-[#CBD5E1] flex items-center gap-1">
                  Questions
                  <span className="text-[10px] text-[#4F7DFF] font-medium">
                    (Subscription Only)
                  </span>
                </label>

                <div className="flex flex-row relative">
                  <Input
                    value={5}
                    disabled
                    className="mt-1 bg-Primary border-white/10 text-white h-9 opacity-70 cursor-not-allowed"
                  />

                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#4F7DFF] text-sm">
                    🔒
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-[#CBD5E1] hover:text-blue-500 hover:font-bold hover:cursor-pointer h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#4F7DFF] hover:bg-[#3A64E0] text-white px-5 h-9 cursor-pointer"
              >
                {isPending ? <Loading /> : "Start Interview"}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
