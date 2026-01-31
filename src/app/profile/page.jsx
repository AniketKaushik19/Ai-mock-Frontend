"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import useAuthStore from "../../../store/authStore";
import { useUpdateProfile } from "@/hooks/user";
import Loading from "../_component/Loading";

export default function ProfilePage() {
  const { user,login } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const { mutateAsync, isPending } = useUpdateProfile();


  const [profile, setProfile] = useState({
    name: "",
    email: "",
    isSubscribed: false,
    college: "",
    yearOfPassing: "",
    linkedin: "",
  });


  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        isSubscribed: user.isSubscribe || false,
        college: user.college_name || "",
        yearOfPassing: user.year_passing || "",
        linkedin: user.linkedin_url || "",
      });

      setPreview(user.img || null);
    }
    setMounted(true);
  }, [user]);

  if (!mounted) return null;

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPending) return;

    try {
      const data = new FormData();
      data.append("name",profile?.name)
      data.append("college_name", profile?.college);
      data.append("year_passing", profile?.yearOfPassing);
      data.append("linkedin_url", profile?.linkedin);

      if (image) data.append("img", image);
     const result= await mutateAsync(data);
     if(!result.success){
     toast.error("Something went wrong ");

    }
      login(result?.user);



    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-Primary flex items-center justify-center px-4 py-6">
      <Card className="w-full max-w-2xl bg-[#112A46] text-white border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-center">My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden border border-white/20 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image
                src={preview || "/image/avatar.png"}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={profile.name} onChange={handleChange} />
            </div>

            <div>
              <Label>Email</Label>
              <Input value={profile.email} disabled />
            </div>

            <div>
              <Label>College Name</Label>
              <Input
                name="college"
                value={profile.college}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Year of Passing</Label>
              <Input
                name="yearOfPassing"
                value={profile.yearOfPassing}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>LinkedIn URL</Label>
              <Input
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Subscription */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Subscription Status:</span>
            {profile.isSubscribed ? (
              <Badge className="bg-green-600">Active</Badge>
            ) : (
              <Badge variant="destructive">Not Active</Badge>
            )}
          </div>
           <Button
              onClick={handleSubmit} disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >{isPending ?(
                <Loading />
            ):(
              "Save Changes"
            )

            }
           </Button>

        </CardContent>
      </Card>
    </div>
  );
}

