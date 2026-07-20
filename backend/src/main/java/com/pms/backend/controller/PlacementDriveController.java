// src/main/java/com/pms/backend/controller/PlacementDriveController.java
package com.pms.backend.controller;

import com.pms.backend.dto.PlacementDriveRequest;
import com.pms.backend.entity.PlacementDrive;
import com.pms.backend.service.PlacementDriveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drives")
@RequiredArgsConstructor
public class PlacementDriveController {

    private final PlacementDriveService driveService;

    @PostMapping
    public ResponseEntity<PlacementDrive> createDrive(@Valid @RequestBody PlacementDriveRequest request) {
        return new ResponseEntity<>(driveService.createDrive(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<PlacementDrive>> getAllDrives(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String company) {
        return ResponseEntity.ok(driveService.getAllDrives(page, size, company));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementDrive> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlacementDrive> updateDrive(
            @PathVariable Long id,
            @Valid @RequestBody PlacementDriveRequest request) {
        return ResponseEntity.ok(driveService.updateDrive(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.ok("Placement Drive deleted successfully.");
    }
}