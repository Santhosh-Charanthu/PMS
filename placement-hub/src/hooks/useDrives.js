"use client";

import { useCallback, useEffect, useState } from "react";
import { driveService } from "@/services/driveService";

export function useDrives({ page = 1, search = "" } = {}) {
  const [drives, setDrives] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrives = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await driveService.list({ page: page - 1, search });
      const list = Array.isArray(data)
        ? data
        : data.content || data.items || [];
      setDrives(list);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "Could not load placement drives");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDrives();
  }, [fetchDrives]);

  return { drives, totalPages, isLoading, error, refetch: fetchDrives };
}
