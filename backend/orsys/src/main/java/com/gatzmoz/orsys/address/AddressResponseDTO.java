package com.gatzmoz.orsys.address;

public record AddressResponseDTO(
    Long id,
    String fullAddress,
    String village,
    String district,
    String city,
    String province,
    String country,
    String createdAt,
    String updatedAt
) {
    public static AddressResponseDTO fromAddress(Address address) {
        if (address == null) return null;
        return new AddressResponseDTO(
            address.getId(),
            address.getFullAddress(),
            address.getVillage(),
            address.getDistrict(),
            address.getCity(),
            address.getProvince(),
            address.getCountry(),
            address.getCreatedAt() != null ? address.getCreatedAt().toString() : null,
            address.getUpdatedAt() != null ? address.getUpdatedAt().toString() : null
        );
    }
}
