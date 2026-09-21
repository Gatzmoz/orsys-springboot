package com.gatzmoz.orsys.organization.division;

import java.util.List;

import org.springframework.stereotype.Service;



@Service 
public class DivisionService {
    
    private DivisionRepository divisionRepository;

    public DivisionService(DivisionRepository divisionRepository){
        this.divisionRepository = divisionRepository;
    }

    public List<Division> getAllDivisions(){
        return divisionRepository.findAll();
    }
}
