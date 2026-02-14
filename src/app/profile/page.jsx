"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Linkedin,
  MapPin,
  Edit,
  Check,
  Sparkles,
  Save,
  X,
  Camera,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";
import { useUpdateProfile } from "@/hooks/user";
import Loading from "../_component/Loading";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, login } = useAuthStore();
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateProfile();
  const fileInputRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    college: "",
    yearOfPassing: "",
    linkedin: "",
  });

  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    college: "",
    yearOfPassing: "",
    linkedin: "",
  });

  useEffect(() => {
    if (user) {
      const userProfile = {
        name: user.name || "",
        email: user.email || "",
        college: user.college_name || "",
        yearOfPassing: user.year_passing || "",
        linkedin: user.linkedin_url || "",
      };
      setProfile(userProfile);
      setEditedProfile(userProfile);
      setPreview(user.img || null);
    }
    setMounted(true);
  }, [user]);

  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const handleEditClick = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSaveClick = async () => {
    if (isPending) return;

    try {
      const data = new FormData();
      data.append("name", editedProfile?.name);
      data.append("college_name", editedProfile?.college);
      data.append("year_passing", editedProfile?.yearOfPassing);
      data.append("linkedin_url", editedProfile?.linkedin);

      if (image) data.append("img", image);

      const result = await mutateAsync(data);
      if (!result.success) {
        return;
      }

      login(result?.user);
      setProfile(editedProfile);
      setIsEditing(false);
      setImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setImage(null);
    setPreview(user?.img || null);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1C2D] via-[#112A46] to-[#0D2B5B] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header with sparkles */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-6 h-6 text-pink-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                User Profile
              </h1>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </motion.div>
            <p className="text-gray-300">View and manage your profile information</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div variants={cardVariants}>
            <Card
              className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-lg shadow-2xl overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Decorative top border */}
              <motion.div
                className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                animate={{
                  backgroundPosition: isHovered
                    ? ["0% 50%", "100% 50%", "0% 50%"]
                    : "0% 50%",
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <CardContent className="p-6 md:p-8">
                {/* Avatar Section */}
                <motion.div
                  className="flex flex-col md:flex-row items-center gap-6 mb-8"
                  variants={itemVariants}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative group">
                      <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-purple-500/50 shadow-lg shadow-purple-500/20">
                        <AvatarImage
                          src={preview || "/image/avatar.png"}
                          alt={profile.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-3xl">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <Camera className="w-8 h-8 text-white" />
                        </motion.button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-[#386bed] rounded-full p-2 shadow-lg"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <motion.h2
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      variants={itemVariants}
                    >
                      {profile.name}
                    </motion.h2>
                    <motion.div
                      className="flex flex-wrap gap-2 justify-center md:justify-start mb-4"
                      variants={itemVariants}
                    >
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                        Student
                      </Badge>
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button
                          className="bg-[#386bed] hover:bg-[#2d5ed1] text-white shadow-lg shadow-[#386bed]/30"
                          onClick={handleSaveClick}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loading />
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-purple-500/50 text-slate-900  hover:bg-purple-500/10 hover:text-white"
                          onClick={handleCancelClick}
                          disabled={isPending}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="bg-[#386bed] hover:bg-[#2d5ed1] text-white shadow-lg shadow-[#386bed]/30"
                        onClick={handleEditClick}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </motion.div>
                </motion.div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" />

                {/* Profile Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Mail className="w-6 h-6 text-purple-400" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">Email Address</p>
                            {isEditing ? (
                              <Input
                                value={editedProfile.email}
                                disabled
                                className="bg-slate-800/50 border-purple-500/30 text-white"
                              />
                            ) : (
                              <p className="text-white break-all">{profile.email}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* College */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <GraduationCap className="w-6 h-6 text-pink-400" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">College Name</p>
                            {isEditing ? (
                              <Input
                                value={editedProfile.college}
                                onChange={(e) =>
                                  handleInputChange("college", e.target.value)
                                }
                                className="bg-slate-800/50 border-purple-500/30 text-white"
                              />
                            ) : (
                              <p className="text-white">{profile.college}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Year of Passing */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Calendar className="w-6 h-6 text-purple-400" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">
                              Year of Passing
                            </p>
                            {isEditing ? (
                              <Input
                                type="number"
                                value={editedProfile.yearOfPassing}
                                onChange={(e) =>
                                  handleInputChange("yearOfPassing", e.target.value)
                                }
                                className="bg-slate-800/50 border-purple-500/30 text-white"
                              />
                            ) : (
                              <p className="text-white">{profile.yearOfPassing}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* LinkedIn */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/50 hover:border-purple-400/70 transition-all duration-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Linkedin className="w-6 h-6 text-pink-400" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-1">
                              LinkedIn Profile
                            </p>
                            {isEditing ? (
                              <Input
                                value={editedProfile.linkedin}
                                onChange={(e) =>
                                  handleInputChange("linkedin", e.target.value)
                                }
                                className="bg-slate-800/50 border-purple-500/30 text-white"
                              />
                            ) : (
                              <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#386bed] hover:text-[#2d5ed1] underline break-all transition-colors"
                              >
                                View Profile
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer note */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-400 mt-8 text-sm"
          >
            Profile information is secure and private
          </motion.p>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}