package com.javasampleapproach.springrest.postgresql.service;

import com.javasampleapproach.springrest.postgresql.model.Post;
import com.javasampleapproach.springrest.postgresql.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

   private final PostRepository postRepository;

   @Autowired
   public PostService(PostRepository postRepository) {
      this.postRepository = postRepository;
   }

   public List<Post> getAllPosts() {
      System.out.println("Get all Posts...");
      List<Post> posts = new ArrayList<>();
      postRepository.findAll().forEach(posts::add);

      return posts;
   }

   public Post crateNewPost(Post post) {
      Post _post = postRepository.save(new Post(post.getTitolo(), post.getTesto(), post.getAutore()));

      return _post;
   }

   public ResponseEntity<String> deletePost(long id) {
      System.out.println("Delete Post with ID = " + id + "...");

      postRepository.deleteById(id);

      return new ResponseEntity<>("Post has been deleted!", HttpStatus.OK);
   }

   public ResponseEntity<String> deleteAllPosts() {
      System.out.println("Delete All Posts...");

      postRepository.deleteAll();

      return new ResponseEntity<>("All posts have been deleted!", HttpStatus.OK);
   }

   public List<Post> findPostByAutore(String autore) {
      List<Post> posts = postRepository.findByAutore(autore);

      return posts;
   }

   public ResponseEntity<Post> updatePost(long id, Post post) {
      System.out.println("Update Post with ID = " + id + "...");

      Optional<Post> postData = postRepository.findById(id);

      if (postData.isPresent()) {
         Post _post = postData.get();
         _post.setTitolo(post.getTitolo());
         _post.setTesto(post.getTesto());
         _post.setLike(post.getLike());
         _post.setDislike(post.getDislike());
         return new ResponseEntity<>(postRepository.save(_post), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
   }

   public ResponseEntity<Post> giveLike(long postId, Integer userId) {
      System.out.println("User with ID = " + userId + " gives a like to the post with ID = " + postId);

      Optional<Post> postData = postRepository.findById(postId);

      if (postData.isPresent()) {
         Post _post = postData.get();
         _post.giveLike(userId);
         return new ResponseEntity<>(postRepository.save(_post), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
   }

   public ResponseEntity<Post> giveDislike(long postId, Integer userId) {
      System.out.println("User with ID = " + userId + " gives a like to the post with ID = " + postId);

      Optional<Post> postData = postRepository.findById(postId);

      if (postData.isPresent()) {
         Post _post = postData.get();
         _post.giveDislike(userId);
         return new ResponseEntity<>(postRepository.save(_post), HttpStatus.OK);
      } else {
         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
   }
}
