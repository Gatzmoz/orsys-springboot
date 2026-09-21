package com.gatzmoz.orsys.organization.department;

import java.util.List;

import org.springframework.stereotype.Service;


@Service 
public class DepartmentService {
    
    private DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments(){
        return departmentRepository.findAll();
    }
}
