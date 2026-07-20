package com.pms.backend.dto.request;

import com.pms.backend.enums.Branch;
import com.pms.backend.enums.Gender;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateStudentRequest {
    private Branch branch;
    private Integer backlogs;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private Gender gender;
    private Integer graduationYear;
    private Double cgpa;
    private List<String> skills;
}
