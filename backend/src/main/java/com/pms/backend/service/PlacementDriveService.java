// src/main/java/com/pms/backend/service/PlacementDriveService.java
package com.pms.backend.service;

import com.pms.backend.dto.PlacementDriveRequest;
import com.pms.backend.entity.PlacementDrive;
import org.springframework.data.domain.Page;

public interface PlacementDriveService {
    PlacementDrive createDrive(PlacementDriveRequest request);
    PlacementDrive updateDrive(Long id, PlacementDriveRequest request);
    void deleteDrive(Long id);
    PlacementDrive getDriveById(Long id);
    Page<PlacementDrive> getAllDrives(int page, int size, String searchCompany);
}