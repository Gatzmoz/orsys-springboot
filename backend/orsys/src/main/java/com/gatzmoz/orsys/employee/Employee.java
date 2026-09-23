package com.gatzmoz.orsys.employee;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gatzmoz.orsys.address.Address;
import com.gatzmoz.orsys.organization.position.Position;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name = "employees")
public class Employee {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeCode;
    private String name;
    private String phoneNumber;
    private LocalDate birthDate;
    private Long baseSalary;
    
    @OneToOne 
    @JoinColumn (name = "address_id")
    private Address address;

    @JsonIgnoreProperties({"address", "managerId"})
    @ManyToOne 
    @JoinColumn (name = "manager_id")
    private Employee managerId;

    @CreatedDate
    private LocalDateTime createdAt;
    
    @UpdateTimestamp 
    private LocalDateTime updatedAt;

    @ManyToOne 
    @JoinColumn (name = "position_id")
    private Position position;

    @Enumerated(EnumType.STRING)
    private EmployeeType employeeType;

    @Enumerated(EnumType.STRING)
    private EmployeeStatus employeeStatus;

    @Enumerated (EnumType.STRING)
    private Gender gender;

    public Employee(){

    }

    public Employee(Long id, String name, String employeeCode, Boolean isActive, String phoneNumber, LocalDate birthDate, Long baseSalary, Address address, Employee managerId, EmployeeType employeeType, Position position, Gender gender, EmployeeStatus employeeStatus, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.employeeCode = employeeCode;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.baseSalary = baseSalary;
        this.address = address;
        this.managerId = managerId;
        this.employeeType = employeeType;
        this.employeeStatus = employeeStatus;
        this.gender = gender;
        this.position = position;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Long getBaseSalary() {
        return baseSalary;
    }

    public Address getAddress() {
        return address;
    }

    public Position getPosition() {
        return position;
    }

    public Gender getGender() {
        return gender;
    }

    public Employee getManagerId() {
        return managerId;
    }

    public EmployeeType getEmployeeType(){
        return employeeType;
    }

    public EmployeeStatus getEmployeeStatus(){
        return employeeStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setBaseSalary(Long baseSalary) {
        this.baseSalary = baseSalary;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setManagerId(Employee managerId) {
        this.managerId = managerId;
    }

    public void setEmployeeType(EmployeeType employeeType){
        this.employeeType = employeeType;
    }


    public void setEmployeeStatus(EmployeeStatus employeeStatus){
        this.employeeStatus = employeeStatus;
    }

    public void setPosition(Position position){
        this.position = position;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }   

}
