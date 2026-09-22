package com.gatzmoz.orsys.organization.position;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.gatzmoz.orsys.organization.division.Division;
import com.gatzmoz.orsys.organization.division.DivisionRepository;

@Service 
public class PositionService {
    
    private final PositionRepository positionRepository;
    private final DivisionRepository divisionRepository;

    public PositionService(PositionRepository positionRepository, DivisionRepository divisionRepository){
        this.positionRepository = positionRepository;
        this.divisionRepository = divisionRepository;
    }

    public List<Position> getAllPositions(){
        return positionRepository.findAll();
    }

    public Position getPositionById(Long id){
        return positionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Position not found with id: " + id));
    }

    @Transactional
    public Position createPosition(Position position){
        if (position.getDivision() != null && position.getDivision().getId() != null) {
            Division div = divisionRepository.findById(position.getDivision().getId()).orElse(null);
            position.setDivision(div);
        }
        return positionRepository.save(position);
    }

    @Transactional
    public Position updatePosition(Long id, Position updated){
        Position existing = getPositionById(id);
        existing.setName(updated.getName());
        if (updated.getDivision() != null && updated.getDivision().getId() != null) {
            Division div = divisionRepository.findById(updated.getDivision().getId()).orElse(null);
            existing.setDivision(div);
        }
        return positionRepository.save(existing);
    }

    @Transactional
    public void deletePosition(Long id){
        if (!positionRepository.existsById(id)) {
            throw new RuntimeException("Position not found with id: " + id);
        }
        positionRepository.deleteById(id);
    }
}
