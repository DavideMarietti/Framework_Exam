package userservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import userservice.model.User;
import userservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {
   @Autowired
   UserRepository repository;

   @GetMapping("/users")
   public List<User> getAllUsers() {
      System.out.println("Get all Users...");

      List<User> users = new ArrayList<>();
      repository.findAll().forEach(users::add);

      return users;
   }
}
