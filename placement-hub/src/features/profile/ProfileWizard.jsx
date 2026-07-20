"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Phone, Calendar, Hash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SegmentedControl from "@/components/ui/SegmentedControl";
import SearchableSelect from "@/components/ui/SearchableSelect";
import ChipInput from "@/components/ui/ChipInput";
import { BRANCHES, GENDERS } from "@/constants";
import { studentService } from "@/services/studentService";

const schema = z.object({
  rollNumber: z.string().min(1, "Roll number is required"),
  branch: z.string().min(1, "Select your branch"),
  graduationYear: z
    .string()
    .min(4, "Enter a valid year")
    .max(4, "Enter a valid year"),
  backlogs: z.string().min(1, "Enter 0 if you have none"),
  phoneNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Select your gender"),
  cgpa: z.string().min(1, "CGPA is required"),
});

const STEPS = ["Personal details", "Academic details", "Skills"];

export default function ProfileWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const branch = watch("branch");
  const gender = watch("gender");

  const stepFields = [
    ["phoneNumber", "dateOfBirth", "gender"],
    ["rollNumber", "branch", "graduationYear", "backlogs", "cgpa"],
    [],
  ];

  const goNext = async () => {
    const valid = await trigger(stepFields[step]);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (values) => {
    if (skills.length === 0) {
      toast.error("Add at least one skill");
      return;
    }
    setSubmitting(true);
    try {
      await studentService.createProfile({
        ...values,
        graduationYear: Number(values.graduationYear),
        backlogs: Number(values.backlogs),
        cgpa: Number(values.cgpa),
        skills,
      });
      toast.success("Profile created successfully");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Could not save your profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  i < step
                    ? "gradient-brand text-white"
                    : i === step
                    ? "border-2 border-[var(--primary)] text-[var(--primary)]"
                    : "border border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`hidden text-sm font-medium sm:block ${i === step ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-[var(--border)]" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <Input
                label="Phone number"
                icon={Phone}
                placeholder="9876543210"
                required
                error={errors.phoneNumber?.message}
                {...register("phoneNumber")}
              />
              <Input
                label="Date of birth"
                type="date"
                icon={Calendar}
                required
                error={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
              />
              <SegmentedControl
                label="Gender"
                options={GENDERS}
                value={gender}
                onChange={(v) => setValue("gender", v, { shouldValidate: true })}
                error={errors.gender?.message}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <Input
                label="Roll number"
                icon={Hash}
                placeholder="21A91A0501"
                required
                error={errors.rollNumber?.message}
                {...register("rollNumber")}
              />
              <SearchableSelect
                label="Branch"
                options={BRANCHES}
                value={branch}
                onChange={(v) => setValue("branch", v, { shouldValidate: true })}
                required
                error={errors.branch?.message}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Graduation year"
                  placeholder="2027"
                  required
                  error={errors.graduationYear?.message}
                  {...register("graduationYear")}
                />
                <Input
                  label="Active backlogs"
                  placeholder="0"
                  required
                  error={errors.backlogs?.message}
                  {...register("backlogs")}
                />
              </div>
              <Input
                label="CGPA"
                placeholder="8.5"
                required
                error={errors.cgpa?.message}
                {...register("cgpa")}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <ChipInput
                label="Skills"
                value={skills}
                onChange={setSkills}
                hint="Press Enter or comma after each skill, e.g. Java, Spring Boot, React"
              />
              <p className="text-xs text-[var(--muted)]">
                You can upload your photo and resume right after creating your profile.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            icon={ChevronLeft}
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            className={step === 0 ? "invisible" : ""}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" icon={ChevronRight} iconPosition="right" onClick={goNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" isLoading={submitting} icon={Check} iconPosition="right">
              Create profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
