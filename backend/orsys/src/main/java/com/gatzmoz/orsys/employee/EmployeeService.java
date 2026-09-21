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


}
