package com.pms.backend.service;

import com.pms.backend.entity.Application;
import com.pms.backend.enums.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    Application applyForDrive(Long studentId, Long driveId);

    void withdrawApplication(Long applicationId);

    List<Application> getApplicationsByStudent(Long studentId);

    List<Application> getApplicationsByDrive(Long driveId);

    Application updateApplicationStatus(Long applicationId,
                                        ApplicationStatus status);
}