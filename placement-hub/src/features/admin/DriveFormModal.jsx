"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Save } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ChipInput from "@/components/ui/ChipInput";
import { driveService } from "@/services/driveService";

export default function DriveFormModal({ open, onOpenChange, drive, onSaved }) {
  const [skills, setSkills] = useState([]);
  const [saving, setSaving] = useState(false);
  const isEdit = !!drive?.id;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      companyName: "",
      role: "",
      jobPackage: "",
      jobLocation: "",
      deadline: "",
      driveDescription: "",
      jobDescription: "",
      recruitmentProcess: "",
      minCgpa: "",
      backlogRestrictions: "",
      graduationYear: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        companyName: drive?.companyName || "",
        role: drive?.role || "",
        jobPackage: drive?.jobPackage || "",
        jobLocation: drive?.jobLocation || "",
        deadline: drive?.deadline ? drive.deadline.slice(0, 16) : "",
        driveDescription: drive?.driveDescription || "",
        jobDescription: drive?.jobDescription || "",
        recruitmentProcess: drive?.recruitmentProcess || "",
        minCgpa: drive?.minCgpa || "",
        backlogRestrictions: drive?.backlogRestrictions || "",
        graduationYear: drive?.graduationYear || "",
      });
      setSkills(
        Array.isArray(drive?.requiredSkills)
          ? drive.requiredSkills
          : drive?.requiredSkills?.split(",").map((s) => s.trim()).filter(Boolean) || []
      );
    }
  }, [open, drive, reset]);

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = {
        ...values,
        deadline: values.deadline ? new Date(values.deadline).toISOString() : null,
        minCgpa: values.minCgpa ? Number(values.minCgpa) : null,
        backlogRestrictions: values.backlogRestrictions ? Number(values.backlogRestrictions) : null,
        graduationYear: values.graduationYear ? Number(values.graduationYear) : null,
        requiredSkills: skills.join(", "),
      };
      if (isEdit) {
        await driveService.update(drive.id, payload);
        toast.success("Drive updated");
      } else {
        await driveService.create(payload);
        toast.success("Drive created");
      }
      onSaved?.();
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Could not save the drive");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Edit drive" : "Create a new drive"}
      description="This information will be visible to all eligible students."
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Company name" required {...register("companyName")} />
          <Input label="Role" required {...register("role")} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Package" placeholder="e.g. 8 LPA" {...register("jobPackage")} />
          <Input label="Location" {...register("jobLocation")} />
          <Input label="Deadline" type="datetime-local" {...register("deadline")} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Min CGPA" type="number" step="0.1" placeholder="6.0" {...register("minCgpa")} />
          <Input label="Max backlogs" type="number" placeholder="0" {...register("backlogRestrictions")} />
          <Input label="Graduation year" type="number" placeholder="2026" {...register("graduationYear")} />
        </div>
        <ChipInput label="Skills required" value={skills} onChange={setSkills} />
        <Textarea label="Drive description" {...register("driveDescription")} />
        <Textarea label="Job description" {...register("jobDescription")} />
        <Textarea label="Recruitment process" {...register("recruitmentProcess")} />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" isLoading={saving} icon={Save}>
            {isEdit ? "Save changes" : "Create drive"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
