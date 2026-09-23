package com.gatzmoz.orsys.employee;

import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class EmployeeService {
    
   private EmployeeRepository employeeRepository;

   public EmployeeService(EmployeeRepository employeeRepository) {
       this.employeeRepository = employeeRepository;
   }

   public List<EmployeeResponseDTO> getAllEmployees() {
       return employeeRepository.findAll().stream()
           .map(EmployeeResponseDTO::fromEmployee)
           .toList();
   }

   public EmployeeResponseDTO getEmployeeById(Long id) {
       return employeeRepository.findById(id)
           .map(EmployeeResponseDTO::fromEmployee)
           .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
   }

}
