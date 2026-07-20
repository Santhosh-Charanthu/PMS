package com.pms.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
    String uploadImage(MultipartFile file);
    String uploadResume(MultipartFile file);
    void deleteFile(String url,  String resourceType);
}
