package com.gatzmoz.orsys.config.seeder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gatzmoz.orsys.address.Address;
import com.gatzmoz.orsys.address.AddressRepository;
import com.gatzmoz.orsys.employee.Employee;
import com.gatzmoz.orsys.employee.EmployeeRepository;
import com.gatzmoz.orsys.employee.EmployeeStatus;
import com.gatzmoz.orsys.employee.EmployeeType;
import com.gatzmoz.orsys.organization.department.Department;
import com.gatzmoz.orsys.organization.department.DepartmentRepository;
import com.gatzmoz.orsys.organization.division.Division;
import com.gatzmoz.orsys.organization.division.DivisionRepository;
import com.gatzmoz.orsys.organization.position.Position;
import com.gatzmoz.orsys.organization.position.PositionRepository;
import com.gatzmoz.orsys.role.Role;
import com.gatzmoz.orsys.role.RoleRepository;
import com.gatzmoz.orsys.user.User;
import com.gatzmoz.orsys.user.UserRepository;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(
            RoleRepository roleRepository,
            UserRepository userRepository,
            EmployeeRepository employeeRepository,
            AddressRepository addressRepository,
            DepartmentRepository departmentRepository,
            DivisionRepository divisionRepository,
            PositionRepository positionRepository,
            PasswordEncoder passwordEncoder) {
        
        return args -> {
            // 1. Seed Roles if missing
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = roleRepository.save(new Role(null, "ROLE_ADMIN"));
            }

            Role managerRole = roleRepository.findByName("ROLE_MANAGER");
            if (managerRole == null) {
                managerRole = roleRepository.save(new Role(null, "ROLE_MANAGER"));
            }

            Role employeeRole = roleRepository.findByName("ROLE_EMPLOYEE");
            if (employeeRole == null) {
                employeeRole = roleRepository.save(new Role(null, "ROLE_EMPLOYEE"));
            }

            // Seed Department
            Department hr = departmentRepository.findByName("Human Capital");
            if (hr == null) {
                hr = departmentRepository.save(new Department(null, "Human Capital"));
            }
            Department it = departmentRepository.findByName("Information Technology");
            if (it == null) {
                it = departmentRepository.save(new Department(null, "Information Technology"));
            }
            Department fmcg = departmentRepository.findByName("Fast Moving Consumer Good");
            if (fmcg == null) {
                fmcg = departmentRepository.save(new Department(null, "Fast Moving Consumer Good"));
            }

            //Division
            Division payroll = divisionRepository.findByName("Human Capital");
            if (payroll == null) {
                payroll = divisionRepository.save(new Division(null, hr, "Human Capital"));
            }
            Division web = divisionRepository.findByName("Web Developer");
            if (web == null) {
                web = divisionRepository.save(new Division(null, it,"Web Developer"));
            }
            Division sales = divisionRepository.findByName("Sales");
            if (sales == null) {
                sales = divisionRepository.save(new Division(null, fmcg ,"Sales"));
            }

            //Position
            Position payrollHead = positionRepository.findByName("Head of Payroll");
            if (payrollHead == null) {
                payrollHead = positionRepository.save(new Position(null, payroll, "Head of Payroll"));
            }
            Position salesStaff = positionRepository.findByName("Sales Staff");
            if (salesStaff == null) {
                salesStaff = positionRepository.save(new Position(null, sales, "Sales Staff"));
            }
            Position backend = positionRepository.findByName("Backend Staff");
            if (backend == null) {
                backend = positionRepository.save(new Position(null, web, "Backend Staff"));
            }

            // 2. Seed Users (Alif, Anando, Gilang)
            if (userRepository.count() == 0) {
                User gilangUser = new User(null, "gilang", passwordEncoder.encode("password123"), "gilang@company.com", adminRole, LocalDateTime.now(), LocalDateTime.now());
                User alifUser = new User(null, "alif", passwordEncoder.encode("password123"), "alif@company.com", managerRole, LocalDateTime.now(), LocalDateTime.now());
                User anandoUser = new User(null, "anando", passwordEncoder.encode("password123"), "anando@company.com", employeeRole, LocalDateTime.now(), LocalDateTime.now());

                userRepository.saveAll(List.of(gilangUser, alifUser, anandoUser));
                System.out.println(">>> Database seeded 3 users (Gilang, Alif, Anando) successfully!");
            }

            // 3. Seed Employees & Addresses (Gilang, Alif, Anando)
            if (employeeRepository.count() == 0) {
                // Employee 1: Gilang (Admin / Top Manager)
                Employee gilangEmp = new Employee();
                gilangEmp.setName("Gilang");
                gilangEmp.setPhoneNumber("081234567891");
                gilangEmp.setBirthDate(LocalDate.of(1995, 3, 10));
                gilangEmp.setBaseSalary(12000000L);
                gilangEmp.setManagerId(null);
                gilangEmp.setEmployeeType(EmployeeType.FULLTIME);
                gilangEmp.setEmployeeStatus(EmployeeStatus.ACTIVE);
                gilangEmp.setPosition(payrollHead);
                gilangEmp.setCreatedAt(LocalDateTime.now());
                gilangEmp.setUpdatedAt(LocalDateTime.now());
                gilangEmp = employeeRepository.save(gilangEmp);

                Address gilangAddress = createAddress(gilangEmp, "Jl. Sudirman No. 45", "Gambir", "Gambir", "Jakarta Pusat", "DKI Jakarta", "Indonesia");
                gilangAddress = addressRepository.save(gilangAddress);
                gilangEmp.setAddress(gilangAddress);
                employeeRepository.save(gilangEmp);

                // Employee 2: Alif (Manager)
                Employee alifEmp = new Employee();
                alifEmp.setName("Alif");
                alifEmp.setPhoneNumber("081234567892");
                alifEmp.setBirthDate(LocalDate.of(1996, 5, 14));
                alifEmp.setBaseSalary(10000000L);
                alifEmp.setManagerId(gilangEmp);
                alifEmp.setEmployeeType(EmployeeType.CONTRACT);
                alifEmp.setEmployeeStatus(EmployeeStatus.LEAVE);
                alifEmp.setPosition(backend);
                alifEmp.setCreatedAt(LocalDateTime.now());
                alifEmp.setUpdatedAt(LocalDateTime.now());
                alifEmp = employeeRepository.save(alifEmp);

                Address alifAddress = createAddress(alifEmp, "Jl. Dago No. 12", "Coblong", "Coblong", "Bandung", "Jawa Barat", "Indonesia");
                alifAddress = addressRepository.save(alifAddress);
                alifEmp.setAddress(alifAddress);
                employeeRepository.save(alifEmp);

                // Employee 3: Anando (Employee)
                Employee anandoEmp = new Employee();
                anandoEmp.setName("Anando");
                anandoEmp.setPhoneNumber("081234567893");
                anandoEmp.setBirthDate(LocalDate.of(2000, 2, 18));
                anandoEmp.setBaseSalary(7500000L);
                anandoEmp.setManagerId(alifEmp);
                anandoEmp.setEmployeeType(EmployeeType.INTERN);
                anandoEmp.setEmployeeStatus(EmployeeStatus.TERMINATED);
                anandoEmp.setPosition(salesStaff);
                anandoEmp.setCreatedAt(LocalDateTime.now());
                anandoEmp.setUpdatedAt(LocalDateTime.now());
                anandoEmp = employeeRepository.save(anandoEmp);

                Address anandoAddress = createAddress(anandoEmp, "Jl. Pandanaran No. 23", "Semarang Tengah", "Semarang Tengah", "Semarang", "Jawa Tengah", "Indonesia");
                anandoAddress = addressRepository.save(anandoAddress);
                anandoEmp.setAddress(anandoAddress);
                employeeRepository.save(anandoEmp);

                System.out.println(">>> Database seeded 3 employees & addresses (Gilang, Alif, Anando) successfully!");
            }
        };
    }

    private Address createAddress(Employee employee, String street, String village, String district, String city, String province, String country) {
        Address addr = new Address();
        addr.setEmployeeId(employee);
        addr.setFullAddress(street + ", " + village + ", " + city + ", " + province);
        addr.setVillage(village);
        addr.setDistrict(district);
        addr.setCity(city);
        addr.setProvince(province);
        addr.setCountry(country);
        addr.setCreatedAt(LocalDateTime.now());
        addr.setUpdatedAt(LocalDateTime.now());
        return addr;
    }
}