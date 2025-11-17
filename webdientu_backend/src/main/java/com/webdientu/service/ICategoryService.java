package com.webdientu.service;

import com.webdientu.DTO.CategoryDTO;
import com.webdientu.form.CreateCategoryForm;
import com.webdientu.form.UpdateCategoryForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoryService {
    Page<CategoryDTO> getAllCategory(Pageable pageable);

    CategoryDTO getCategoryById(int id);

    CategoryDTO createNewCategory(CreateCategoryForm createCategoryForm);

    CategoryDTO updateCategoryById(int id, UpdateCategoryForm updateCategoryForm);

    void deleteCategories(List<Integer> categoryIds);

    void deleteCategoryById(int id);
}
