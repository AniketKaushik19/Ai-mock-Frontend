"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, login, interviewLimit } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const { mutateAsync, isPending } = useUpdateProfile();

  const [profile, setProfile] = useState({
    name: "Abhishek Sharma",
    email: "abhishek@gmail.com",
    isSubscribed: true,
    college: "IIT Delhi",
    yearOfPassing: "2025",
    linkedin: "https://linkedin.com/in/abhishek",
    avatar: "/avatar.png",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        avatar: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPending) return;

    try {
      const data = new FormData();
      data.append("name", profile?.name)
      data.append("college_name", profile?.college);
      data.append("year_passing", profile?.yearOfPassing);
      data.append("linkedin_url", profile?.linkedin);

      if (image) data.append("img", image);
      const result = await mutateAsync(data);
      if (!result.success) {
        toast.error("Something went wrong ");

      }
      login(result?.user);



    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-Primary flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl bg-[#112A46] text-white border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-center">My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Image */}
          <div className="flex items-center gap-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border border-white/20">
              <Image
                src={profile.avatar}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm text-blue-400 hover:underline"
              >
                Change Profile Picture
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={profile.name} onChange={handleChange}/>
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

          {/* Subscription Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Subscription Status:</span>
            {profile.isSubscribed ? (
              <Badge className="bg-green-600">Active</Badge>
            ) : (
              <Badge variant="destructive">Not Subscribed</Badge>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
