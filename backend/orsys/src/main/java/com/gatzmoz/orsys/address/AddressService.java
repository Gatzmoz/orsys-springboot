package com.gatzmoz.orsys.address;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<AddressResponseDTO> getAllAddresses() {
        return addressRepository.findAll().stream()
            .map(AddressResponseDTO::fromAddress)
            .toList();
    }

    public AddressResponseDTO getAddressById(Long id) {
        return addressRepository.findById(id)
            .map(AddressResponseDTO::fromAddress)
            .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));
    }

    @Transactional
    public AddressResponseDTO createAddress(Address address) {
        Address saved = addressRepository.save(address);
        return AddressResponseDTO.fromAddress(saved);
    }

    @Transactional
    public AddressResponseDTO updateAddress(Long id, Address updated) {
        Address existing = addressRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Address not found with id: " + id));

        existing.setFullAddress(updated.getFullAddress());
        existing.setVillage(updated.getVillage());
        existing.setDistrict(updated.getDistrict());
        existing.setCity(updated.getCity());
        existing.setProvince(updated.getProvince());
        existing.setCountry(updated.getCountry());

        Address saved = addressRepository.save(existing);
        return AddressResponseDTO.fromAddress(saved);
    }

    @Transactional
    public void deleteAddress(Long id) {
        if (!addressRepository.existsById(id)) {
            throw new RuntimeException("Address not found with id: " + id);
        }
        addressRepository.deleteById(id);
    }
}
