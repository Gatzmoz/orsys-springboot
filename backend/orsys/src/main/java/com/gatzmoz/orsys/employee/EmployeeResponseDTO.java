package com.gatzmoz.orsys.employee;

import com.gatzmoz.orsys.address.AddressResponseDTO;
import com.gatzmoz.orsys.organization.department.Department;
import com.gatzmoz.orsys.organization.division.Division;
import com.gatzmoz.orsys.organization.position.Position;

// Summary DTO for Manager to prevent nested recursion
record ManagerSummaryDTO(
    Long id,
    String name
) {
    public static ManagerSummaryDTO fromEmployee(Employee manager) {
        if (manager == null) return null;
        return new ManagerSummaryDTO(manager.getId(), manager.getName());
    }
}

// 1. Department Summary DTO
record DepartmentSummaryDTO(Long id, String name) {
    public static DepartmentSummaryDTO fromDepartment(Department dept) {
        if (dept == null) return null;
        return new DepartmentSummaryDTO(dept.getId(), dept.getName());
    }
}

// 2. Division Summary DTO
record DivisionSummaryDTO(Long id, String name, DepartmentSummaryDTO department) {
    public static DivisionSummaryDTO fromDivision(Division div) {
        if (div == null) return null;
        return new DivisionSummaryDTO(
            div.getId(), 
            div.getName(), 
            DepartmentSummaryDTO.fromDepartment(div.getDepartment())
        );
    }
}

// 3. Position Summary DTO
record PositionSummaryDTO(Long id, String name, DivisionSummaryDTO division) {
    public static PositionSummaryDTO fromPosition(Position pos) {
        if (pos == null) return null;
        return new PositionSummaryDTO(
            pos.getId(), 
            pos.getName(), 
            DivisionSummaryDTO.fromDivision(pos.getDivision())
        );
    }
}

// Main DTO for Employee responses
public record EmployeeResponseDTO(
    Long id,
    String employeeCode,
    String name,
    String phoneNumber,
    String birthDate,
    Long baseSalary,
    Gender gender,
    EmployeeStatus employeeStatus,
    EmployeeType employeeType,
    AddressResponseDTO address,
    ManagerSummaryDTO manager,
    PositionSummaryDTO position,
    String createdAt,
    String updatedAt
) {
    public static EmployeeResponseDTO fromEmployee(Employee employee) {
        if (employee == null) return null;
        return new EmployeeResponseDTO(
            employee.getId(),
            employee.getEmployeeCode(),
            employee.getName(),
            employee.getPhoneNumber(),
            employee.getBirthDate() != null ? employee.getBirthDate().toString() : null,
            employee.getBaseSalary(),
            employee.getGender(),
            employee.getEmployeeStatus(),
            employee.getEmployeeType(),
            AddressResponseDTO.fromAddress(employee.getAddress()),
            ManagerSummaryDTO.fromEmployee(employee.getManagerId()),
            PositionSummaryDTO.fromPosition(employee.getPosition()),
            employee.getCreatedAt() != null ? employee.getCreatedAt().toString() : null,
            employee.getUpdatedAt() != null ? employee.getUpdatedAt().toString() : null
        );
    }
}