export const BRANCHES = ["AIDS", "AIML", "CIVIL", "CSE", "ECE", "EEE", "MECH"];

export const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const APPLICATION_STATUSES = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "OFFERED",
  "REJECTED",
  "WITHDRAWN",
];

export const STATUS_STYLES = {
  APPLIED: "bg-sky-50 text-sky-700 ring-sky-600/20",
  SHORTLISTED: "bg-blue-50 text-blue-700 ring-blue-600/20",
  INTERVIEW: "bg-purple-50 text-purple-700 ring-purple-600/20",
  OFFERED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-600/20",
  WITHDRAWN: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
