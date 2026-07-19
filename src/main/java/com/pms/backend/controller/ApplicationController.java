package com.pms.backend.controller;

import com.pms.backend.entity.Application;
import com.pms.backend.enums.ApplicationStatus;
import com.pms.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public Application applyForDrive(@RequestParam Long studentId,
                                     @RequestParam Long driveId) {
        return applicationService.applyForDrive(studentId, driveId);
    }

    @PutMapping("/{applicationId}/withdraw")
    public String withdrawApplication(@PathVariable Long applicationId) {
        applicationService.withdrawApplication(applicationId);
        return "Application withdrawn successfully";
    }

    @GetMapping("/student/{studentId}")
    public List<Application> getApplicationsByStudent(@PathVariable Long studentId) {
        return applicationService.getApplicationsByStudent(studentId);
    }

    @GetMapping("/drive/{driveId}")
    public List<Application> getApplicationsByDrive(@PathVariable Long driveId) {
        return applicationService.getApplicationsByDrive(driveId);
    }

    @PutMapping("/{applicationId}/status")
    public Application updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {

        return applicationService.updateApplicationStatus(applicationId, status);
    }
}