import api from "./api";

export const applicationService = {
  apply: (studentId, driveId) =>
    api.post(`/api/applications/apply`, null, {
      params: { studentId, driveId },
    }),
  withdraw: (applicationId) =>
    api.put(`/api/applications/${applicationId}/withdraw`),
  getByStudent: (studentId) =>
    api.get(`/api/applications/student/${studentId}`),
  getByDrive: (driveId) => api.get(`/api/applications/drive/${driveId}`),
  updateStatus: (applicationId, status) =>
    api.put(`/api/applications/${applicationId}/status`, null, {
      params: { status },
    }),
};
