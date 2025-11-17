package com.webdientu.DTO;

import com.webdientu.entity.Account;
import com.webdientu.entity.Account.GENDER;
import com.webdientu.entity.Account.ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccountDTO {
    private String username;
    private String fullname;
    private GENDER gender;
    private Date birthdate;
    private String phoneNumber;
    private String email;
    private String address;
    private ROLE role;
}
