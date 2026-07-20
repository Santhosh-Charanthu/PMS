package com.pms.backend.service;

import com.pms.backend.dto.response.ApplicationResponse;
import com.pms.backend.enums.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse applyForDrive(Long studentId, Long driveId);

    void withdrawApplication(Long applicationId);

    List<ApplicationResponse> getApplicationsByStudent(Long studentId);

    List<ApplicationResponse> getApplicationsByDrive(Long driveId);

    ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus status);
}
