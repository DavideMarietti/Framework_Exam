package com.javasampleapproach.springrest.postgresql.controller;

import java.util.List;

import com.javasampleapproach.springrest.postgresql.service.CommentService;
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

import com.javasampleapproach.springrest.postgresql.model.Comment;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CommentController {

   private final CommentService commentService;

   @Autowired
   public CommentController(CommentService commentService) {
      this.commentService = commentService;
   }

   @GetMapping("/comments")
   public List<Comment> getAllComments() {
      return commentService.getAllComments();
   }

   @PostMapping(value = "/comments/create")
   public Comment postComment(@RequestBody Comment comment) {
      return commentService.addNewComment(comment);
   }

   @DeleteMapping("/comments/{id}")
   public ResponseEntity<String> deleteComment(@PathVariable("id") long id) {
      return commentService.deleteComment(id);
   }

   @DeleteMapping("/comments/delete")
   public ResponseEntity<String> deleteAllComments() {
      return commentService.deleteAllComments();
   }

   @GetMapping(value = "comments/autore/{autore}")
   public List<Comment> findCommentsByAutore(@PathVariable String autore) {
      return commentService.getCommentsByAutore(autore);
   }

   @PutMapping("/comments/{id}")
   public ResponseEntity<Comment> updateComment(@PathVariable("id") long id, @RequestBody Comment comment) {
      return commentService.updateComment(id, comment);
   }
}
