
// src/main/java/com/pms/backend/repository/PlacementDriveRepository.java
package com.pms.backend.repository;

import com.pms.backend.entity.PlacementDrive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {
    Page<PlacementDrive> findByCompanyNameContainingIgnoreCase(String companyName, Pageable pageable);
}