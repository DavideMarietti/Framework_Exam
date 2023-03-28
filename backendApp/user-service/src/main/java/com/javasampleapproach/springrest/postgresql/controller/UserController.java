package com.javasampleapproach.springrest.postgresql.controller;

import java.util.List;

import com.javasampleapproach.springrest.postgresql.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.javasampleapproach.springrest.postgresql.model.User;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {

   private final UserService userService;

   @Autowired
   public UserController(UserService userService) {
      this.userService = userService;
   }

   @GetMapping("/users")
   public List<User> getAllUsers() {
      return userService.getAllUsers();
   }

   @PostMapping(value = "/users/create")
   public User postUser(@RequestBody User user) {
      return userService.addNewUser(user);
   }

   @DeleteMapping("/users/{id}")
   public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
      return userService.removeUser(id);
   }

   @DeleteMapping("/users/delete")
   public ResponseEntity<String> deleteAllUsers() {
      return userService.removeAllUsers();
   }

   @GetMapping(value = "users/eta/{eta}")
   public List<User> findByEta(@PathVariable int eta) {
      return userService.findUserByEta(eta);
   }

   @PutMapping("/users/{id}")
   public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
      return userService.updateUser(id, user);
   }
}
