package com.gatzmoz.orsys.organization.division;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public Division getDivisionById(@PathVariable Long id) {
        return divisionService.getDivisionById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Division createDivision(@RequestBody Division division) {
        return divisionService.createDivision(division);
    }

    @PutMapping("/{id}")
    public Division updateDivision(@PathVariable Long id, @RequestBody Division division) {
        return divisionService.updateDivision(id, division);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDivision(@PathVariable Long id) {
        divisionService.deleteDivision(id);
    }
}
