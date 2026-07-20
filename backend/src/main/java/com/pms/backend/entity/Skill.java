package com.pms.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
