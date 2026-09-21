package com.gatzmoz.orsys.organization.division;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController 
@RequestMapping("api/organization/division")
public class DivisionController {
    
    private final DivisionService divisionService;

    DivisionController(DivisionService divisionService){
        this.divisionService = divisionService;
    }

    @GetMapping
    public List<Division> getAllDivision() {
        return divisionService.getAllDivisions();
    }
    
}
