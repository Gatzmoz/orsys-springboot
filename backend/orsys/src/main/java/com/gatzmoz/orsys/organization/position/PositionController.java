package com.gatzmoz.orsys.organization.position;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController 
@RequestMapping("api/organization/position")
public class PositionController {
    
    private final PositionService divisionService;

    PositionController(PositionService divisionService){
        this.divisionService = divisionService;
    }

    @GetMapping
    public List<Position> getAllDivision() {
        return divisionService.getAllDivisions();
    }
    
}
