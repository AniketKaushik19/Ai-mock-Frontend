'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnBoarding } from '@/hooks/user';
import toast from 'react-hot-toast';
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';
import Loading from '@/app/_component/Loading';

export default function OnboardingPage() {
    const router = useRouter();
    const [preview, setPreview] = useState(null);
    const { login, user } = useAuthStore();
    const [image, setImage] = useState(null);
    const { mutateAsync: onboarding, isPending } = useOnBoarding();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user) {
            router.replace('/');
        }

        if (user && user.isOnboarding == 1) {
            router.replace('/')

        }
    }, [user])


    const [formData, setFormData] = useState({
        college: '',
        year: '',
        linkedin: '',
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isPending) return
        try {
            if (!formData.college || !formData.year || !formData.linkedin || !image) {
                toast.error("fill all necessary details.")
                return;
            }
            const data = new FormData();

            data.append("college_name", formData.college)
            data.append("year_passing", formData.year)
            data.append("linkedin_url", formData.linkedin)
            data.append("img", image)


            const result = await onboarding(data);
            if (!result?.user) {
                throw new Error("Onboarding failed");
            }

            login(result.user);
            router.replace("/");




        } catch (error) {
            console.log(error)
        }

    };

    return (
        <main className="min-h-screen bg-Primary flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-Secondary rounded-xl p-8 border border-white/10">

                <h1 className="text-2xl font-bold text-white text-center mb-6">
                    Complete Your Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">


                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border hover:cursor-pointer hover:scale-110 border-white/20" onClick={() => fileInputRef.current?.click()}>
                            <Image
                                src={preview || '/image/avatar.png'}
                                alt="Profile Preview"
                                fill
                                className="object-cover"
                                name=""
                            />
                        </div>

                        <Label className="cursor-pointer text-[#CBD5E1] text-sm">
                            Upload Profile Picture
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </Label>
                    </div>


                    <div>
                        <Label className="text-white">College Name</Label>
                        <Input
                            name="college"
                            placeholder="Enter your college name"
                            value={formData.college}
                            onChange={handleChange}
                            className="mt-2 bg-Primary text-white border-white/10"
                            required
                        />
                    </div>


                    <div>
                        <Label className="text-white">Year of Passing</Label>
                        <Input
                            name="year"
                            type="number"
                            placeholder="2026"
                            value={formData.year}
                            onChange={handleChange}
                            className="mt-2 bg-Primary text-white border-white/10"
                            required
                        />
                    </div>


                    <div>
                        <Label className="text-white">LinkedIn Profile</Label>
                        <Input
                            name="linkedin"
                            placeholder="https://linkedin.com/in/username"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="mt-2 bg-Primary text-white border-white/10"
                        />
                    </div>

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-[#386bed] hover:bg-[#274fcf] text-white font-semibold"
                    >
                        {isPending ? <Loading /> : "Continue"}
                    </Button>

                </form>
            </div>
        </main>
    );
}
