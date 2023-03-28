package com.javasampleapproach.springrest.postgresql.service;

import com.javasampleapproach.springrest.postgresql.model.Comment;
import com.javasampleapproach.springrest.postgresql.repo.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// Responsible for the business logic
@Service
public class CommentService {

   private final CommentRepository commentRepository;

   @Autowired
   public CommentService(CommentRepository commentRepository) {
      this.commentRepository = commentRepository;
   }

   public List<Comment> getAllComments() {
      System.out.println("Get all Comments...");
      List<Comment> comments = new ArrayList<>();
      commentRepository.findAll().forEach(comments::add);

      return comments;
   }

   public Comment addNewComment(Comment comment) {
      Comment _comment = commentRepository.save(new Comment(comment.getTesto(), comment.getAuthor(), comment.getParentid(), comment.getLevel()));

      return _comment;
   }

   public ResponseEntity<String> deleteComment(long id) {
      System.out.println("Delete Comment with ID = " + id + "...");
      commentRepository.deleteById(id);

      return new ResponseEntity<>("Comment has been deleted!", HttpStatus.OK);
   }

   public ResponseEntity<String> deleteAllComments() {
      System.out.println("Delete All Comments...");
      commentRepository.deleteAll();

      return new ResponseEntity<>("All comments have been deleted!", HttpStatus.OK);
   }

   public List<Comment> findCommentByAuthor(String author) {
      List<Comment> comments = commentRepository.findByAuthor(author);

      return comments;
   }

   public ResponseEntity<Comment> updateComment(long id, Comment comment) {
      System.out.println("Update Comment with ID = " + id + "...");
      Optional<Comment> commentData = commentRepository.findById(id);

      if (commentData.isPresent()) {
         Comment _comment = commentData.get();
         _comment.setTesto(comment.getTesto());
         _comment.setAuthor(comment.getAuthor());
         _comment.setLike(comment.getLike());
         _comment.setDislike(comment.getDislike());
         _comment.setParentid(comment.getParentid());
         _comment.setLevel(comment.getLevel());
         return new ResponseEntity<>(commentRepository.save(_comment), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
   }
}