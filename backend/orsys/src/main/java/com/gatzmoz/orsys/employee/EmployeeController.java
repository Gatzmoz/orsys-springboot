package com.gatzmoz.orsys.employee;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController 
@RequestMapping ("api/employee")
public class EmployeeController {
    
    private final EmployeeService employeeService;

    EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping 
    public List<EmployeeResponseDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeResponseDTO getEmployee(@PathVariable Long id){
        return employeeService.getEmployeeById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponseDTO createEmployee(@RequestBody EmployeeRequestDTO dto) {
        return employeeService.createEmployee(dto);
    }

    @PutMapping("/{id}")
    public EmployeeResponseDTO updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequestDTO dto) {
        return employeeService.updateEmployee(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
