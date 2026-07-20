package com.pms.backend.controller;

import com.pms.backend.dto.response.ApplicationResponse;
import com.pms.backend.enums.ApplicationStatus;
import com.pms.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ApplicationResponse applyForDrive(@RequestParam Long studentId,
                                             @RequestParam Long driveId) {
        return applicationService.applyForDrive(studentId, driveId);
    }

    @PutMapping("/{applicationId}/withdraw")
    public String withdrawApplication(@PathVariable Long applicationId) {
        applicationService.withdrawApplication(applicationId);
        return "Application withdrawn successfully";
    }

    @GetMapping("/student/{studentId}")
    public List<ApplicationResponse> getApplicationsByStudent(@PathVariable Long studentId) {
        return applicationService.getApplicationsByStudent(studentId);
    }

    @GetMapping("/drive/{driveId}")
    public List<ApplicationResponse> getApplicationsByDrive(@PathVariable Long driveId) {
        return applicationService.getApplicationsByDrive(driveId);
    }

    @PutMapping("/{applicationId}/status")
    public ApplicationResponse updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {
        return applicationService.updateApplicationStatus(applicationId, status);
    }
}
