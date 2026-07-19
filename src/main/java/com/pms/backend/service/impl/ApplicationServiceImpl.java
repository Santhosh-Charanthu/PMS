package com.pms.backend.service.impl;

import com.pms.backend.entity.Application;
import com.pms.backend.entity.PlacementDrive;
import com.pms.backend.entity.Student;
import com.pms.backend.enums.ApplicationStatus;
import com.pms.backend.service.ApplicationService;
import org.springframework.stereotype.Service;

import com.pms.backend.repository.ApplicationRepository;
import com.pms.backend.repository.PlacementDriveRepository;
import com.pms.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final PlacementDriveRepository placementDriveRepository;


    @Override
    public Application applyForDrive(Long studentId, Long driveId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        PlacementDrive drive = placementDriveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Placement Drive not found"));

        if (applicationRepository.existsByStudentAndDrive(student, drive)) {
            throw new RuntimeException("You have already applied for this drive");
        }

        Application application = Application.builder()
                .student(student)
                .drive(drive)
                .status(ApplicationStatus.APPLIED)
                .build();

        return applicationRepository.save(application);
    }

    @Override
    public void withdrawApplication(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.WITHDRAWN);

        applicationRepository.save(application);
    }

    @Override
    public List<Application> getApplicationsByStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return applicationRepository.findByStudent(student);
    }

    @Override
    public List<Application> getApplicationsByDrive(Long driveId) {

        PlacementDrive drive = placementDriveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Placement Drive not found"));

        return applicationRepository.findByDrive(drive);
    }

    @Override
    public Application updateApplicationStatus(Long applicationId, ApplicationStatus status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);

        return applicationRepository.save(application);
    }
}