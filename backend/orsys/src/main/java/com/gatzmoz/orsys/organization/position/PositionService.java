package com.gatzmoz.orsys.organization.position;

import java.util.List;

import org.springframework.stereotype.Service;



@Service 
public class PositionService {
    
    private PositionRepository divisionRepository;

    public PositionService(PositionRepository divisionRepository){
        this.divisionRepository = divisionRepository;
    }

    public List<Position> getAllDivisions(){
        return divisionRepository.findAll();
    }
}
