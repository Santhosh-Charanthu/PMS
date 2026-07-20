package com.pms.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.pms.backend.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile file) {
        try{
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return result.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String uploadResume(MultipartFile file) {
        try{
            String filename = file.getOriginalFilename();
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "resource_type", "raw",
                    "folder", "pms/resumes",
                    "use_filename", true,
                    "unique_filename", true,
                    "public_id", filename,
                    "overwrite", true
            ));
            System.out.println("Result = " + result);
            return result.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteFile(String url, String resourceType) {
        try {
            if (url == null || url.isBlank()) {
                return;
            }

            // Extract everything after "/upload/"
            String publicId = url.substring(url.indexOf("/upload/") + "/upload/".length());

            // Remove version (e.g. v1784457420/)
            publicId = publicId.replaceFirst("^v\\d+/", "");

            // Remove query parameters if present
            int queryIndex = publicId.indexOf("?");
            if (queryIndex != -1) {
                publicId = publicId.substring(0, queryIndex);
            }

            // Images should not include extension in public_id
            if ("image".equals(resourceType)) {
                publicId = publicId.replaceFirst("\\.[^.]+$", "");
            }

            Map<String, Object> options = ObjectUtils.asMap(
                    "resource_type", resourceType
            );

            Map<?, ?> result = cloudinary.uploader().destroy(publicId, options);

            System.out.println("Cloudinary Delete Response: " + result);

        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file from Cloudinary", e);
        }
    }
}
