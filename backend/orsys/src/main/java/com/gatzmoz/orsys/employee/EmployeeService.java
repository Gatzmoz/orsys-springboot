package com.gatzmoz.orsys.employee;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gatzmoz.orsys.address.Address;
import com.gatzmoz.orsys.address.AddressRepository;
import com.gatzmoz.orsys.organization.position.Position;
import com.gatzmoz.orsys.organization.position.PositionRepository;

@Service 
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private final AddressRepository addressRepository;
    private final PositionRepository positionRepository;

    public EmployeeService(
        EmployeeRepository employeeRepository,
        AddressRepository addressRepository,
        PositionRepository positionRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.addressRepository = addressRepository;
        this.positionRepository = positionRepository;
    }

    public List<EmployeeResponseDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
            .map(EmployeeResponseDTO::fromEmployee)
            .toList();
    }

    public EmployeeResponseDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
            .map(EmployeeResponseDTO::fromEmployee)
            .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    @Transactional
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {
        Address savedAddress = null;
        if (dto.fullAddress() != null || dto.city() != null || dto.province() != null) {
            Address address = new Address();
            address.setFullAddress(dto.fullAddress());
            address.setVillage(dto.village());
            address.setDistrict(dto.district());
            address.setCity(dto.city());
            address.setProvince(dto.province());
            address.setCountry(dto.country());
            savedAddress = addressRepository.save(address);
        }

        Position position = null;
        if (dto.positionId() != null) {
            position = positionRepository.findById(dto.positionId()).orElse(null);
        }

        Employee manager = null;
        if (dto.managerId() != null) {
            manager = employeeRepository.findById(dto.managerId()).orElse(null);
        }

        Employee employee = new Employee();
        employee.setName(dto.name());
        employee.setPhoneNumber(dto.phoneNumber());
        employee.setBirthDate(dto.birthDate());
        employee.setBaseSalary(dto.baseSalary());
        employee.setPhotoURL(dto.photoURL());
        employee.setEmployeeStatus(dto.employeeStatus() != null ? dto.employeeStatus() : EmployeeStatus.ACTIVE);
        employee.setEmployeeType(dto.employeeType() != null ? dto.employeeType() : EmployeeType.FULLTIME);
        employee.setPosition(position);
        employee.setManagerId(manager);
        employee.setAddress(savedAddress);

        Employee savedEmployee = employeeRepository.save(employee);
        if (savedAddress != null) {
            savedAddress.setEmployeeId(savedEmployee);
            addressRepository.save(savedAddress);
        }

        return EmployeeResponseDTO.fromEmployee(savedEmployee);
    }

    @Transactional
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        if (dto.name() != null) employee.setName(dto.name());
        employee.setPhoneNumber(dto.phoneNumber());
        employee.setBirthDate(dto.birthDate());
        employee.setBaseSalary(dto.baseSalary());
        employee.setPhotoURL(dto.photoURL());
        if (dto.employeeStatus() != null) employee.setEmployeeStatus(dto.employeeStatus());
        if (dto.employeeType() != null) employee.setEmployeeType(dto.employeeType());

        if (dto.positionId() != null) {
            Position position = positionRepository.findById(dto.positionId()).orElse(null);
            employee.setPosition(position);
        } else {
            employee.setPosition(null);
        }

        if (dto.managerId() != null) {
            Employee manager = employeeRepository.findById(dto.managerId()).orElse(null);
            employee.setManagerId(manager);
        } else {
            employee.setManagerId(null);
        }

        Address address = employee.getAddress();
        if (address == null && (dto.fullAddress() != null || dto.city() != null || dto.province() != null)) {
            address = new Address();
            address.setEmployeeId(employee);
        }

        if (address != null) {
            address.setFullAddress(dto.fullAddress());
            address.setVillage(dto.village());
            address.setDistrict(dto.district());
            address.setCity(dto.city());
            address.setProvince(dto.province());
            address.setCountry(dto.country());
            Address savedAddress = addressRepository.save(address);
            employee.setAddress(savedAddress);
        }

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeResponseDTO.fromEmployee(updatedEmployee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }
}
