package com.webdientu.form;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateShopcartForm {
    private int userId;
    private int optionId;
    private int total;
}
