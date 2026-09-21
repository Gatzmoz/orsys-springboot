package com.gatzmoz.orsys.user;

public record UserResponseDTO(Long id, String username, String email) {
    
    public static UserResponseDTO fromUser(User user) {
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

}