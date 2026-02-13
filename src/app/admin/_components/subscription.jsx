'use client';

import { useState } from "react";
import { Plus, Trash2, CheckCircle, X, Edit2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/libs/axios";
import toast from "react-hot-toast";
import { useCreateSubscriptionPlan, useDeleteSubscriptionPlan, useEditSubscriptionPlan, useGetSubscriptionPlans, useToggleSubscriptionPlan } from "@/hooks/adminSubscriptionHooks";

export default function SubscriptionManagement() {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: "",
        price: "",
        monthlyLimit: "",
        featureInput: "",
        features: [],
    });

    const [editingId, setEditingId] = useState(null);


    const parseFeatures = (features) => {
        if (!features) return [];

        if (Array.isArray(features)) return features;

        if (typeof features === "string") {
            try {
                const parsed = JSON.parse(features);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return features.trim() ? [features] : [];
            }
        }

        return [];
    };

    const { data: plansData, isLoading } = useGetSubscriptionPlans();
    const plans = plansData || [];
    const activeCount = plans.filter((p) => p.isActive === 1).length;


    const { mutate: createMutation, isPending: isCreating } = useCreateSubscriptionPlan();
    const { mutate: editMutation, isPending: isEditing } = useEditSubscriptionPlan();
    const isSubmitting = isCreating || isEditing;

    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteSubscriptionPlan();
    const { mutate: toggleStatusMutation, isPending: isToggling } = useToggleSubscriptionPlan();


    const addFeature = () => {
        if (!form.featureInput.trim()) return;

        setForm((prev) => ({
            ...prev,
            features: [...prev.features, prev.featureInput.trim()],
            featureInput: "",
        }));
    };

    const removeFeature = (index) => {
        console.log("Removing feature at index:", index);
        setForm((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };


    const resetForm = () => {
        setForm({
            name: "",
            price: "",
            monthlyLimit: "",
            featureInput: "",
            features: [],
        });
    };

    const handleEdit = (plan) => {
        setEditingId(plan.subscription_id);

        setForm({
            name: plan.name || "",
            price: plan.price?.toString() || "",
            monthlyLimit: plan.Monthly_limit?.toString() || "",
            featureInput: "",
            features: parseFeatures(plan.features),
        });
    };

    const handleSubmit = () => {
        if (!form.name || !form.price) {
            toast.error("Name and price are required");
            return;
        }


        const featuresString = JSON.stringify(form.features);

        const planData = {
            name: form.name,
            price: Number(form.price),
            Monthly_limit: form.monthlyLimit
                ? Number(form.monthlyLimit)
                : null,
            features: featuresString,
            isActive: 1,
        };

        if (editingId) {
            editMutation(
                { id: editingId, planData },
                {
                    onSuccess: () => {
                        toast.success("Plan updated successfully!");
                        resetForm();
                        setEditingId(null);
                    },
                    onError: (error) => {
                        toast.error(error.response?.data?.message || "Failed to update plan");
                    },
                }
            );
        } else {
            createMutation(planData, {
                onSuccess: () => {
                    toast.success("Plan created successfully!");
                    resetForm();
                },
                onError: (error) => {
                    toast.error(error.response?.data?.message || "Failed to create plan");
                },
            });
        }
    };


    return (
        <div className="p-8 bg-Secondary min-h-screen">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-white mb-1 flex items-center gap-2">
                <CreditCard size={22} />
                Subscription Plans
            </h2>

            <p className="text-gray-300 mb-4">
                Create and manage subscription plans & features
            </p>

            <Badge className="bg-green-100 text-green-700 mb-6">
                <CheckCircle className="size-3 mr-1" />
                Active Plans: {activeCount}
            </Badge>

            {/* Create / Edit Card */}
            <div className="bg-Ternary border rounded-xl p-6 mb-8 shadow-sm">
                <h3 className="font-semibold text-white mb-4">
                    {editingId ? "Edit Plan" : "Create New Plan"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-4  text-white">
                    <Input
                        className="bg-white text-slate-950"
                        placeholder="Plan Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <Input
                        className="bg-white text-slate-950"
                        placeholder="Price (₹)"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                    <Input
                        className="bg-white text-slate-950"
                        placeholder="Monthly Limit"
                        type="number"
                        value={form.monthlyLimit}
                        onChange={(e) =>
                            setForm({ ...form, monthlyLimit: e.target.value })
                        }
                    />
                </div>

                <div className="flex  gap-2 mb-3 text-slate-950">
                    <Input
                        className="bg-white"
                        placeholder="Add feature"
                        value={form.featureInput}
                        onChange={(e) =>
                            setForm({ ...form, featureInput: e.target.value })
                        }
                        onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button onClick={addFeature} variant="secondary">
                        <Plus className="size-4" />
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {form.features.map((feature, index) => (
                        <Badge
                            key={index}
                            className="bg-gray-200 text-gray-700 flex items-center gap-1"
                        >
                            {feature}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFeature(index);
                                }}
                            >
                                <X className="size-3 cursor-pointer" />
                            </button>

                        </Badge>
                    ))}

                </div>

                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-Primary text-white flex items-center gap-2 disabled:opacity-60"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin w-5 h-5 text-white" />
                    ) : (
                        <>
                            <Plus className="h-4 w-4" />
                            <span>{editingId ? "Update Plan" : "Add Plan"}</span>
                        </>
                    )}
                </Button>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">
                        Loading plans...
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-Primary">
                            <TableRow>
                                <TableHead className="text-white">Plan</TableHead>
                                <TableHead className="text-white">Price</TableHead>
                                <TableHead className="text-white">Monthly Limit</TableHead>
                                <TableHead className="text-white">Features</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-right text-white">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {plans.map((plan) => {
                                const features = parseFeatures(plan.features);

                                return (
                                    <TableRow
                                        key={plan.subscription_id}
                                        className="hover:bg-slate-50 transition"
                                    >
                                        <TableCell className="font-medium text-gray-800">
                                            {plan.name}
                                        </TableCell>

                                        <TableCell className="text-gray-700">
                                            {plan.price === 0 ? "Free" : `₹${plan.price}`}
                                        </TableCell>

                                        <TableCell className="text-gray-700">
                                            {plan.Monthly_limit || "Unlimited"}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {features.length ? (
                                                    features.map((f, i) => (
                                                        <Badge
                                                            key={i}
                                                            className="bg-gray-200 text-gray-700"
                                                        >
                                                            {f}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        No features
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                className={
                                                    plan.isActive === 1
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-200 text-gray-600"
                                                }
                                            >
                                                {plan.isActive === 1 ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right flex gap-2 justify-end">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleEdit(plan)}
                                            >
                                                <Edit2 className="size-4 text-gray-600" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    toggleStatusMutation(plan, {
                                                        onSuccess: () =>
                                                            toast.success("Status updated!"),
                                                    })
                                                }
                                            >
                                                Toggle
                                            </Button>


                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
