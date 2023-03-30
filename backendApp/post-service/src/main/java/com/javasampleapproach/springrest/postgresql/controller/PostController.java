package com.javasampleapproach.springrest.postgresql.controller;

import java.util.List;

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

import com.javasampleapproach.springrest.postgresql.model.Post;
import com.javasampleapproach.springrest.postgresql.service.PostService;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class PostController {

   private final PostService postService;

   @Autowired
   public PostController(PostService postService) {
      this.postService = postService;
   }

   @GetMapping("/posts")
   public List<Post> getAllPosts() {
      return postService.getAllPosts();
   }

   @PostMapping(value = "/posts/create")
   public Post postPost(@RequestBody Post post) {
      return postService.crateNewPost(post);
   }

   @DeleteMapping("/posts/{id}")
   public ResponseEntity<String> deletePost(@PathVariable("id") long id) {
      return postService.deletePost(id);
   }

   @DeleteMapping("/posts/delete")
   public ResponseEntity<String> deleteAllPosts() {
      return postService.deleteAllPosts();
   }

   @GetMapping(value = "posts/autore/{autore}")
   public List<Post> findByAutore(@PathVariable String autore) {
      return postService.findPostByAutore(autore);
   }

   @PutMapping("/posts/{id}")
   public ResponseEntity<Post> updatePost(@PathVariable("id") long id, @RequestBody Post post) {
      return postService.updatePost(id, post);
   }

   @PutMapping("/posts/like/{id}")
   public ResponseEntity<Post> giveLike(@PathVariable("id") long postId, @RequestBody Integer userId) {
      return postService.giveLike(postId, userId);
   }

   @PutMapping("/posts/dislike/{id}")
   public ResponseEntity<Post> giveDislike(@PathVariable("id") long postId, @RequestBody Integer userId) {
      return postService.giveDislike(postId, userId);
   }
}
