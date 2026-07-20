package com.pms.backend.controller;

import com.pms.backend.dto.request.CreateStudentRequest;
import com.pms.backend.dto.request.UpdateStudentRequest;
import com.pms.backend.dto.response.StudentResponse;
import com.pms.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/profile")
    public StudentResponse createProfile(@Valid @RequestBody CreateStudentRequest request){
        return studentService.createProfile(request);
    }

    @GetMapping("/profile")
    public StudentResponse getProfile(){
        return studentService.getProfile();
    }

    @PatchMapping("/profile")
    public StudentResponse updateProfile(@Valid @RequestBody UpdateStudentRequest request){
        return studentService.updateProfile(request);
    }

    @PostMapping("/profile/image")
    public StudentResponse uploadProfileImage(@RequestParam("file") MultipartFile file){
        return studentService.uploadProfileImage(file);
    }

    @PostMapping("/profile/resume")
    public StudentResponse uploadResume(@RequestParam("file") MultipartFile file){
        return studentService.uploadResume(file);
    }
}
