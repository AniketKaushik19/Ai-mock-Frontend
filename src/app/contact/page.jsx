"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useContactUs } from "@/hooks/contact";
import Loading from "../_component/Loading";

export default function ContactPage() {
    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { mutateAsync, isPending } = useContactUs()
    // handleChange for all inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handleSubmit for form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await mutateAsync(contactData)
        if (res.success) {
            setContactData({
                name: "",
                email: "",
                message: "",
            })
        }

    };

    return (
        <div className="min-h-[88.8vh] bg-Primary px-6 py-24 text-white">
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
                        <ContactItem
                            icon={<Phone />}
                            title="Phone"
                            value="+91 9151179111"
                        />
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
                    className="bg-Secondary border border-white/10 rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            value={contactData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="bg-Primary border-white/10 text-white"
                        />

                        <Input
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="bg-Primary border-white/10 text-white"
                        />

                        <Textarea
                            name="message"
                            value={contactData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Your Message"
                            className="bg-Primary border-white/10 text-white resize-none"
                        />

                        <Button
                            type="submit"
                            className="w-full bg-[#4F7DFF] hover:bg-[#3A64E0] text-white text-lg py-6"
                        >
                            {isPending ? <><Loading className="mr-2 h-5 w-5" /> Message Sending</> :
                                <>
                                    <Send className="mr-2 h-5 w-5" />
                                    Send Message
                                </>
                            }
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