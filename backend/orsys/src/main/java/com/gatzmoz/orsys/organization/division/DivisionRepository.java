package com.gatzmoz.orsys.organization.division;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisionRepository extends JpaRepository<Division, Long>{
    Division findByName(String name);
}
