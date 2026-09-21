package com.gatzmoz.orsys.user;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.gatzmoz.orsys.user.requests.UserCreateRequest;

import jakarta.transaction.Transactional;

@Service 
public class UserService {
    
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponseDTO::fromUser)
                .toList();
    }
    
    public UserResponseDTO getUserById(Long id) {
        return UserResponseDTO.fromUser(userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")));
    }

    @Transactional 
    public UserResponseDTO createUser(UserCreateRequest userCreateRequest) {
        User user = new User();

        if(user.getUsername() == null || user.getUsername().isEmpty() || user.getUsername().length() < 3 ) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username cannot be null or empty");
        }

        if(userRepository.existsByUsername(user.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        if(user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password cannot be null or empty");
        }


        user.setUsername(userCreateRequest.username());

        String hashedpassword = passwordEncoder.encode(userCreateRequest.password());
        user.setPassword(hashedpassword);

        User savedUser = userRepository.save(user);

        return UserResponseDTO.fromUser(savedUser);
    }
}