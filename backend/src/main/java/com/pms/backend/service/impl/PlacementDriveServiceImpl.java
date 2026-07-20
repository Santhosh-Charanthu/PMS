// src/main/java/com/pms/backend/service/impl/PlacementDriveServiceImpl.java
package com.pms.backend.service.impl;

import com.pms.backend.dto.PlacementDriveRequest;
import com.pms.backend.entity.PlacementDrive;
import com.pms.backend.repository.PlacementDriveRepository;
import com.pms.backend.service.PlacementDriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlacementDriveServiceImpl implements PlacementDriveService {

    private final PlacementDriveRepository driveRepository;

    @Override
    @Transactional
    public PlacementDrive createDrive(PlacementDriveRequest request) {
        PlacementDrive drive = PlacementDrive.builder()
                .companyName(request.getCompanyName())
                .role(request.getRole())
                .jobPackage(request.getJobPackage())
                .jobLocation(request.getJobLocation())
                .deadline(request.getDeadline())
                .driveDescription(request.getDriveDescription())
                .jobDescription(request.getJobDescription())
                .recruitmentProcess(request.getRecruitmentProcess())
                .requiredSkills(request.getRequiredSkills())
                .minCgpa(request.getMinCgpa())
                .backlogRestrictions(request.getBacklogRestrictions())
                .graduationYear(request.getGraduationYear())
                .eligibleBranches(request.getEligibleBranches())
                .build();

        return driveRepository.save(drive);
    }

    @Override
    @Transactional
    public PlacementDrive updateDrive(Long id, PlacementDriveRequest request) {
        PlacementDrive drive = getDriveById(id);

        drive.setCompanyName(request.getCompanyName());
        drive.setRole(request.getRole());
        drive.setJobPackage(request.getJobPackage());
        drive.setJobLocation(request.getJobLocation());
        drive.setDeadline(request.getDeadline());
        drive.setDriveDescription(request.getDriveDescription());
        drive.setJobDescription(request.getJobDescription());
        drive.setRecruitmentProcess(request.getRecruitmentProcess());
        drive.setRequiredSkills(request.getRequiredSkills());
        drive.setMinCgpa(request.getMinCgpa());
        drive.setBacklogRestrictions(request.getBacklogRestrictions());
        drive.setGraduationYear(request.getGraduationYear());

        // Safe update for Hibernate @ElementCollection
        if (drive.getEligibleBranches() != null) {
            drive.getEligibleBranches().clear();
            if (request.getEligibleBranches() != null) {
                drive.getEligibleBranches().addAll(request.getEligibleBranches());
            }
        } else {
            drive.setEligibleBranches(request.getEligibleBranches());
        }

        return driveRepository.save(drive);
    }

    @Override
    @Transactional
    public void deleteDrive(Long id) {
        PlacementDrive drive = getDriveById(id);
        driveRepository.delete(drive);
    }

    @Override
    public PlacementDrive getDriveById(Long id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Placement Drive not found with id: " + id));
    }

    @Override
    public Page<PlacementDrive> getAllDrives(int page, int size, String searchCompany) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("deadline").descending());

        if (searchCompany != null && !searchCompany.trim().isEmpty()) {
            return driveRepository.findByCompanyNameContainingIgnoreCase(searchCompany, pageable);
        }
        return driveRepository.findAll(pageable);
    }
}