package com.gatzmoz.orsys.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gatzmoz.orsys.user.requests.UserCreateRequest;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import org.springframework.web.bind.annotation.CrossOrigin;

@RestController 
@CrossOrigin(origins = "*")
@RequestMapping ("api/users")
public class UserController {
    

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ALL USER DATA
    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        UserResponseDTO createdUser = userService.createUser(userCreateRequest);
        return ResponseEntity.ok(createdUser);
    }

}
