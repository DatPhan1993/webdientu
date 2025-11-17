package com.webdientu.repository;

import com.webdientu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category, Integer>{

}
