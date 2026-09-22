package com.gatzmoz.orsys.employee;

import java.time.LocalDate;

public record EmployeeRequestDTO(
    String name,
    String phoneNumber,
    LocalDate birthDate,
    Long baseSalary,
    String photoURL,
    EmployeeStatus employeeStatus,
    EmployeeType employeeType,
    Long positionId,
    Long managerId,
    String fullAddress,
    String village,
    String district,
    String city,
    String province,
    String country
) {}
