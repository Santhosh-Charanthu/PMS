package com.pms.backend.repository;

import com.pms.backend.entity.Skill;
import com.pms.backend.entity.Student;
import com.pms.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumber(String rollNumber);
    boolean existsByRollNumber(String rollNumber);
    Optional<Student> findByUser(User user);
}
