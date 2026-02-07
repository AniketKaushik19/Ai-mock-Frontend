"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useContact } from "@/hooks/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutateAsync, isPending } =useContact()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res=await mutateAsync(formData)
    if(res.success==true){
        setFormData({
            name:"",
            email:"",
            message:""
        })
    }
  };

  return (
    <div className="min-h-[88.8vh] bg-[#0B1C2D] px-6 py-24 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4F7DFF]">
            Contact Us
          </h1>

          <p className="mt-4 text-[#CBD5E1] text-lg">
            Have questions about AI Mock Interviews? Need help or feedback?
            We're here to help you succeed 🚀
          </p>

          <div className="mt-10 space-y-6">
            <ContactItem
              icon={<Mail />}
              title="Email"
              value="support@countryedu.com"
            />

            <ContactItem icon={<Phone />} title="Phone" value="+91 9151179111" />

            <ContactItem
              icon={<MapPin />}
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
          className="bg-[#112A46] border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
              className="bg-[#0B1C2D] border-white/10 text-white"
            />

            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#0B1C2D] border-white/10 text-white"
            />

            <Textarea
              rows={5}
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-[#0B1C2D] border-white/10 text-white resize-none"
            />

            <Button
              type="submit"
              className="w-full bg-[#4F7DFF] hover:bg-[#3A64E0] text-white text-lg py-6"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

const ContactItem = ({ icon, title, value }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#4F7DFF]/10 text-[#4F7DFF]">
      {icon}
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-[#CBD5E1]">{value}</p>
    </div>
  </div>
);