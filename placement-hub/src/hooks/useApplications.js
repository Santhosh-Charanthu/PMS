"use client";

import { useCallback, useEffect, useState } from "react";
import { applicationService } from "@/services/applicationService";

export function useApplications(studentId) {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async () => {
    if (!studentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await applicationService.getByStudent(studentId);
      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      setError(err.message || "Could not load your applications");
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, setApplications, isLoading, error, refetch: fetchApplications };
}
