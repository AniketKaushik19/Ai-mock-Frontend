'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CreateInterviewModal({ open, setOpen }) {
  const [form, setForm] = useState({
    role: '',
    description: '',
    experience: '',
  });

  // ✅ MISSING FUNCTION — FIX
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ MISSING FUNCTION — FIX
  const handleSubmit = () => {
    console.log('Interview Data:', form);

    // TODO: Call backend API here

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#112A46] text-white border border-white/10 max-w-lg">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Tell us more about your job interviewing
            </DialogTitle>
            <p className="text-sm text-[#CBD5E1]">
              Add details about your job position/role, job description and years of experience
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-5">

            {/* Job Role */}
            <div>
              <label className="text-sm text-[#CBD5E1]">
                Job Role / Job Position
              </label>
              <Input
                name="role"
                placeholder="Ex. Full Stack Developer"
                value={form.role}
                onChange={handleChange}
                className="mt-2 bg-[#0B1C2D] border-white/10 text-white"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="text-sm text-[#CBD5E1]">
                Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                name="description"
                placeholder="Ex. React, Angular, Node.js, MySQL etc"
                value={form.description}
                onChange={handleChange}
                className="mt-2 bg-[#0B1C2D] border-white/10 text-white min-h-[90px]"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm text-[#CBD5E1]">
                Years of Experience
              </label>
              <Input
                name="experience"
                type="number"
                placeholder="Ex. 5"
                value={form.experience}
                onChange={handleChange}
                className="mt-2 bg-[#0B1C2D] border-white/10 text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-[#CBD5E1] hover:text-white"
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                className="bg-[#4F7DFF] hover:bg-[#3A64E0] text-white px-6"
              >
                Start Interview
              </Button>
            </div>

          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
