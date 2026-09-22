package com.gatzmoz.orsys.organization.position;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController 
@RequestMapping("api/organization/position")
public class PositionController {
    
    private final PositionService positionService;

    PositionController(PositionService positionService){
        this.positionService = positionService;
    }

    @GetMapping
    public List<Position> getAllPositions() {
        return positionService.getAllPositions();
    }

    @GetMapping("/{id}")
    public Position getPositionById(@PathVariable Long id) {
        return positionService.getPositionById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Position createPosition(@RequestBody Position position) {
        return positionService.createPosition(position);
    }

    @PutMapping("/{id}")
    public Position updatePosition(@PathVariable Long id, @RequestBody Position position) {
        return positionService.updatePosition(id, position);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePosition(@PathVariable Long id) {
        positionService.deletePosition(id);
    }
}
