package com.gatzmoz.orsys.organization.division;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.gatzmoz.orsys.organization.department.Department;
import com.gatzmoz.orsys.organization.department.DepartmentRepository;

@Service 
public class DivisionService {
    
    private final DivisionRepository divisionRepository;
    private final DepartmentRepository departmentRepository;

    public DivisionService(DivisionRepository divisionRepository, DepartmentRepository departmentRepository){
        this.divisionRepository = divisionRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<Division> getAllDivisions(){
        return divisionRepository.findAll();
    }

    public Division getDivisionById(Long id){
        return divisionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Division not found with id: " + id));
    }

    @Transactional
    public Division createDivision(Division division){
        if (division.getDepartment() != null && division.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(division.getDepartment().getId()).orElse(null);
            division.setDepartment(dept);
        }
        return divisionRepository.save(division);
    }

    @Transactional
    public Division updateDivision(Long id, Division updated){
        Division existing = getDivisionById(id);
        existing.setName(updated.getName());
        if (updated.getDepartment() != null && updated.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(updated.getDepartment().getId()).orElse(null);
            existing.setDepartment(dept);
        }
        return divisionRepository.save(existing);
    }

    @Transactional
    public void deleteDivision(Long id){
        if (!divisionRepository.existsById(id)) {
            throw new RuntimeException("Division not found with id: " + id);
        }
        divisionRepository.deleteById(id);
    }
}
