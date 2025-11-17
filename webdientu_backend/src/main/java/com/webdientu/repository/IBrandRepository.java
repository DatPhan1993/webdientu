package com.webdientu.repository;

import com.webdientu.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBrandRepository extends JpaRepository<Brand, Integer> {
}
