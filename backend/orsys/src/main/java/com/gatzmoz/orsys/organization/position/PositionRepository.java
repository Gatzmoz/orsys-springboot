package com.gatzmoz.orsys.organization.position;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PositionRepository extends JpaRepository<Position, Long>{
    Position findByName(String name);
}
