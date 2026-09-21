package com.gatzmoz.orsys.organization.position;

import com.gatzmoz.orsys.organization.division.Division;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name = "positions")
public class Position {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne 
    @JoinColumn (name = "division_id")
    private Division division;
    private String name;

    public Position(){

    }

    public Position(Long id, Division division, String name){
        this.id = id;
        this.division = division;
        this.name = name;
    }

    public Long getId(){
        return id;
    }

    public Division getDivision(){
        return division;
    }

    public String getName(){
        return name;
    }

    public void setId(Long id){
        this.id = id;
    }

    public void setDivision(Division division){
        this.division = division;
    }

    public void setName(String name){
        this.name = name;
    }


}
