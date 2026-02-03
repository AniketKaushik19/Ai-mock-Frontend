'use client';

import { useState } from "react";
import { Plus, Trash2, CheckCircle, X, Edit2 } from "lucide-react";
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

    
    const {mutate: createMutation, isLoading: isCreating} = useCreateSubscriptionPlan();

    const {mutate: editMutation, isLoading: isEditing} = useEditSubscriptionPlan();

    const {mutate: deleteMutation, isLoading: isDeleting} = useDeleteSubscriptionPlan();

  

    const {mutate: toggleStatusMutation, isLoading: isToggling} = useToggleSubscriptionPlan();

    
    const addFeature = () => {
        if (!form.featureInput.trim()) return;

        setForm((prev) => ({
            ...prev,
            features: [...prev.features, prev.featureInput.trim()],
            featureInput: "",
        }));
    };

    const removeFeature = (index) => {
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
        <div className="p-8 bg-slate-950 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-1">Subscription Plans</h2>
            <p className="text-slate-400 mb-6">
                Create and manage subscription plans & features
            </p>

            <Badge className="bg-green-900/40 text-green-300 mb-6">
                <CheckCircle className="size-3 mr-1" />
                Active Plans: {activeCount}
            </Badge>

           
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">
                    {editingId ? "Edit Plan" : "Create New Plan"}
                </h3>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <Input
                        placeholder="Plan Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Price (₹)"
                        type="number"
                        value={form.price}
                        onChange={(e) =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Monthly Limit"
                        type="number"
                        value={form.monthlyLimit}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                monthlyLimit: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex gap-2 mb-3">
                    <Input
                        placeholder="Add feature"
                        value={form.featureInput}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                featureInput: e.target.value,
                            })
                        }
                        onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button onClick={addFeature} variant="secondary">
                        <Plus className="size-4" />
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {form.features.map((feature, index) => (
                        <Badge key={index} className="flex items-center gap-1">
                            {feature}
                            <X
                                className="size-3 cursor-pointer"
                                onClick={() => removeFeature(index)}
                            />
                        </Badge>
                    ))}
                </div>

                <Button onClick={handleSubmit} className="bg-indigo-600">
                    {editingId ? "Update Plan" : "Add Plan"}
                </Button>
            </div>

       
            <div className="bg-slate-900 border border-slate-800 rounded-xl text-white overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-slate-400">
                        Loading plans...
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
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
                                    >
                                        <TableCell className="text-white">{plan.name}</TableCell>
                                        <TableCell className="text-white">
                                            {plan.price === 0
                                                ? "Free"
                                                : `₹${plan.price}`}
                                        </TableCell>
                                        <TableCell>
                                            {plan.Monthly_limit || "Unlimited"}
                                        </TableCell>
                                        <TableCell className="text-white">
                                            <div className="flex flex-wrap gap-1">
                                                {features.length > 0 ? (
                                                    features.map((f, i) => (
                                                        <Badge key={i}>
                                                            {f}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-500 text-sm">
                                                        No features
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white">
                                            <Badge>
                                                {plan.isActive === 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right flex gap-2 justify-end">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    handleEdit(plan)
                                                }
                                            >
                                                <Edit2 className="size-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() =>
                                                    toggleStatusMutation(
                                                        plan,
                                                        {
                                                            onSuccess: () => {
                                                                toast.success("Status updated!");
                                                            },
                                                            onError: (error) => {
                                                                toast.error(error.response?.data?.message || "Failed to update status");
                                                            },
                                                        }
                                                    )
                                                }
                                            >
                                                Toggle
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-red-400"
                                                onClick={() => {
                                                    if (confirm("Delete this plan?")) {
                                                        deleteMutation(
                                                            plan.subscription_id,
                                                            {
                                                                onSuccess: () => {
                                                                    toast.success("Plan deleted!");
                                                                },
                                                                onError: (error) => {
                                                                    toast.error(error.response?.data?.message || "Failed to delete");
                                                                },
                                                            }
                                                        );
                                                    }
                                                }}
                                            >
                                                <Trash2 className="size-4" />
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
