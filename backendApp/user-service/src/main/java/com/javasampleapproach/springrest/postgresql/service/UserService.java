package com.javasampleapproach.springrest.postgresql.service;

import com.javasampleapproach.springrest.postgresql.model.User;
import com.javasampleapproach.springrest.postgresql.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Responsible for the business logic
@Service
public class UserService {

   private final UserRepository userRepository;

   @Autowired
   public UserService(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   public List<User> getAllUsers() {
      System.out.println("Get all Users...");
      List<User> users = new ArrayList<>();
      userRepository.findAll().forEach(users::add);

      return users;
   }

   public User addNewUser(User user) {
      List<User> userOptional = userRepository.findByUsername(user.getUsername());
      /*
      if (userOptional.size() > 0) {
      throw new IllegalStateException("Username already registered.");
      }
      */

      User _user = new User(user.getUsername(), user.getPassword(), user.getNome(), user.getCognome(),
              user.getSesso(), user.getEta());

      userRepository.save(_user);

      return _user;
   }

   public ResponseEntity<String> removeUser(long id) {
      System.out.println("Delete User with ID = " + id + "...");
      userRepository.deleteById(id);

      return new ResponseEntity<>("User has been deleted!", HttpStatus.OK);
   }

   public ResponseEntity<String> removeAllUsers() {
      System.out.println("Delete All Users...");
      userRepository.deleteAll();

      return new ResponseEntity<>("All users have been deleted!", HttpStatus.OK);
   }

   public List<User> findUserByEta(int eta) {
      List<User> users = userRepository.findByEta(eta);

      return users;
   }

   public List<User> findUserByUsername(String username) {
      List<User> users = userRepository.findByUsername(username);

      return users;
   }

   public List<User> findUserByNome(String nome) {
      List<User> users = userRepository.findByNome(nome);

      return users;
   }

   public List<User> findUserByCognome(String cognome) {
      List<User> users = userRepository.findByCognome(cognome);

      return users;
   }

   public ResponseEntity<User> updateUser(long id, User user) {
      System.out.println("Update User with ID = " + id + "...");
      Optional<User> userData = userRepository.findById(id);

      if (userData.isPresent()) {
         User _user = userData.get();
         _user.setUsername(user.getUsername());
         _user.setPassword(user.getPassword());
         _user.setNome(user.getNome());
         _user.setCognome(user.getCognome());
         _user.setSesso(user.getSesso());
         _user.setEta(user.getEta());
         return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
   }
}