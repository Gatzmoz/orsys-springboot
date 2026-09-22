package com.gatzmoz.orsys.organization.department;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service 
public class DepartmentService {
    
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments(){
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id){
        return departmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
    }

    @Transactional
    public Department createDepartment(Department department){
        return departmentRepository.save(department);
    }

    @Transactional
    public Department updateDepartment(Long id, Department updated){
        Department existing = getDepartmentById(id);
        existing.setName(updated.getName());
        return departmentRepository.save(existing);
    }

    @Transactional
    public void deleteDepartment(Long id){
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }
}
