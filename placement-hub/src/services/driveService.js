import api from "./api";

export const driveService = {
  list: (params) => api.get("/api/drives", { params }),
  getById: (id) => api.get(`/api/drives/${id}`),
  create: (payload) => api.post("/api/drives", payload),
  update: (id, payload) => api.put(`/api/drives/${id}`, payload),
  remove: (id) => api.delete(`/api/drives/${id}`),
};
