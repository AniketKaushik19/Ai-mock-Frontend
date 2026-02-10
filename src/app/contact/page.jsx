"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useContact } from "@/hooks/contact";
import SectionBackground from "../_component/Home/SectionBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutateAsync, isPending } = useContact();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await mutateAsync(formData);
    if (res.success == true) {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-[88.8vh] relative overflow-hidden bg-[#0B1C2D] text-white selection:bg-[#4F7DFF] selection:text-white">
      {/* Background with Contact/Network Theme */}
      <SectionBackground variant="orbs" className="opacity-60" />

      <div className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                Get in Touch
              </h1>

              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg">
                Have questions about AI Mock Interviews? Need help or feedback?
                We're here to help you succeed 🚀
              </p>
            </div>

            <div className="grid gap-6">
              <ContactItem
                icon={<Mail className="w-6 h-6" />}
                title="Email"
                value="support@countryedu.com"
                link="mailto:support@countryedu.com"
              />

              <ContactItem
                icon={<Phone className="w-6 h-6" />}
                title="Phone"
                value="+91 9151179111"
                link="tel:+919151179111"
              />

              <ContactItem
                icon={<MapPin className="w-6 h-6" />}
                title="Office"
                value="Gurgaon, Haryana, India"
              />
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-10 rounded-full opacity-20" />
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                <p className="text-slate-400">We'll get back to you within 24 hours</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    className="bg-[#0B1C2D]/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-12 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#0B1C2D]/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 h-12 rounded-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                  <Textarea
                    rows={5}
                    placeholder="How can we help you?"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#0B1C2D]/50 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl resize-none transition-all p-4"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-lg font-medium py-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const ContactItem = ({ icon, title, value, link }) => (
  <motion.a
    href={link || "#"}
    onClick={link ? undefined : (e) => e.preventDefault()}
    className={`flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group ${link ? 'cursor-pointer' : 'cursor-default'}`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
      <p className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
        {value}
      </p>
    </div>
  </motion.a>
);