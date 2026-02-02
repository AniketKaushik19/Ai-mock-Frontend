'use client';
import { useState } from "react";
import { Plus, Trash2, CheckCircle, X } from "lucide-react";
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

import { useCreateSubscription } from "@/hooks/subscription";

const initialPlans = [
    {
        id: "1",
        name: "Free",
        price: 0,
        status: "active",
        features: [
            "1 Mock Interview",
            "Basic Feedback",
        ],
    },
    {
        id: "2",
        name: "Basic",
        price: 999,
        status: "active",
        features: [
            "5 Mock Interviews",
            "AI Feedback",
            "Email Support",
        ],
    },
    {
        id: "3",
        name: "Premium",
        price: 2499,
        status: "inactive",
        features: [
            "Unlimited Interviews",
            "Advanced AI Feedback",
            "Resume Review",
            "Priority Support",
        ],
    },
];

export default function SubscriptionManagement() {
    const [plans, setPlans] = useState(initialPlans);
    const [form, setForm] = useState({
        name: "",
        price: "",
        featureInput: "",
        features: [],
    });
    const {mutateAsync:createPlan , isPending:createPlanPending}=useCreateSubscription()

    const activeCount = plans.filter((p) => p.status === "active").length;

    const addFeature = () => {
        if (!form.featureInput.trim()) return;

        setForm({
            ...form,
            features: [...form.features, form.featureInput.trim()],
            featureInput: "",
        });
    };

    const removeFeature = (index) => {
        setForm({
            ...form,
            features: form.features.filter((_, i) => i !== index),
        });
    };

    const handleCreate = async() => {
        if (!form.name) return;
        try {
             setPlans([
            ...plans,
            {
                id: Date.now().toString(),
                name: form.name,
                price: Number(form.price || 0),
                status: "active",
                features: form.features,
            },
        ]);
        const res= await createPlan(form)
        if(res.success){
            setForm({ name: "", price: "", featureInput: "", features: [] });
        }
        } catch (error) {
            console.log(error)
        }
       
    };

    const toggleStatus = (id) => {
        setPlans(
            plans.map((p) =>
                p.id === id
                    ? { ...p, status: p.status === "active" ? "inactive" : "active" }
                    : p
            )
        );
    };

    const handleDelete = (id) => {
        setPlans(plans.filter((p) => p.id !== id));
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-slate-100">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold">Subscription Plans</h2>
                <p className="text-slate-400">
                    Create and manage subscription plans & features
                </p>
            </div>

            {/* Active Count */}
            <div className="mb-6">
                <Badge className="bg-green-900/40 text-green-300">
                    <CheckCircle className="size-3 mr-1" />
                    Active Plans: {activeCount}
                </Badge>
            </div>

            {/* Create Plan */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Create New Plan</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Plan Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Price (₹)"
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                </div>

                {/* Features Input */}
                <div className="flex gap-2 mb-3">
                    <Input
                        className="bg-slate-950 border-slate-700 text-slate-100"
                        placeholder="Add feature (e.g. Unlimited Interviews)"
                        value={form.featureInput}
                        onChange={(e) =>
                            setForm({ ...form, featureInput: e.target.value })
                        }
                        onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={addFeature}
                    >
                        <Plus className="size-4" />
                    </Button>
                </div>

                {/* Feature List */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {form.features.map((feature, index) => (
                        <Badge className="bg-indigo-900/40 text-indigo-300 flex items-center gap-1 pr-1">
                            {feature}
                            <button
                                type="button"
                                onClick={() => removeFeature(index)}
                                className="ml-1 rounded hover:bg-indigo-800 p-0.5"
                            >
                                <X className="size-3" />
                            </button>
                        </Badge>

                    ))}
                </div>

                <Button
                    onClick={handleCreate}
                    className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                >
                    <Plus className="size-4" />
                    Add Plan
                </Button>
            </div>

            {/* Plans Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-slate-400">Plan</TableHead>
                            <TableHead className="text-slate-400">Price</TableHead>
                            <TableHead className="text-slate-400">Features</TableHead>
                            <TableHead className="text-slate-400">Status</TableHead>
                            <TableHead className="text-right text-slate-400">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow
                                key={plan.id}
                                className="hover:bg-slate-800/50"
                            >
                                <TableCell className="font-medium">
                                    {plan.name}
                                </TableCell>

                                <TableCell>
                                    {plan.price === 0 ? "Free" : `₹${plan.price}`}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {plan.features.map((f, i) => (
                                            <Badge
                                                key={i}
                                                className="bg-slate-800 text-slate-300"
                                            >
                                                {f}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            plan.status === "active"
                                                ? "bg-green-900/40 text-green-300"
                                                : "bg-slate-800 text-slate-400"
                                        }
                                    >
                                        {plan.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-slate-300"
                                        onClick={() => toggleStatus(plan.id)}
                                    >
                                        Toggle
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-400"
                                        onClick={() => handleDelete(plan.id)}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
