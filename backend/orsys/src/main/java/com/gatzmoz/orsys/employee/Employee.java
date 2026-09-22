package com.gatzmoz.orsys.employee;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.gatzmoz.orsys.address.Address;
import com.gatzmoz.orsys.organization.position.Position;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity 
@Table (name = "employees")
public class Employee {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phoneNumber;
    private LocalDate birthDate;
    private Long baseSalary;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String photoURL;
    
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

    public Employee(){

    }

    public Employee(Long id, String name, Boolean isActive, String phoneNumber, LocalDate birthDate, Long baseSalary, String photoURL, Address address, Employee managerId, EmployeeType employeeType, Position position, EmployeeStatus employeeStatus, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.baseSalary = baseSalary;
        this.photoURL = photoURL;
        this.address = address;
        this.managerId = managerId;
        this.employeeType = employeeType;
        this.employeeStatus = employeeStatus;
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

    public String getPhotoURL(){
        return photoURL;
    }
    public Position getPosition() {
        return position;
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

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public void setAddress(Address address) {
        this.address = address;
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
