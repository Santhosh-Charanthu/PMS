

package com.pms.backend.repository;

import com.pms.backend.entity.Application;
import com.pms.backend.entity.PlacementDrive;
import com.pms.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByStudentAndDrive(Student student, PlacementDrive drive);

    List<Application> findByStudent(Student student);

    List<Application> findByDrive(PlacementDrive drive);
}