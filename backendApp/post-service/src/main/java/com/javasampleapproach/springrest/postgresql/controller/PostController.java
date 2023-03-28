package com.javasampleapproach.springrest.postgresql.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.javasampleapproach.springrest.postgresql.repo.PostRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class PostController {

	@Autowired
	PostRepository repository;

	@GetMapping("/posts")
	public List<Post> getAllPosts() {
		System.out.println("Get all Posts...");

		List<Post> posts = new ArrayList<>();
		repository.findAll().forEach(posts::add);

		return posts;
	}

	@PostMapping(value = "/posts/create")
	public Post postPost(@RequestBody Post post) {

		Post _post = repository.save(new Post(post.getTitolo(), post.getTesto(), post.getAutore()));
		return _post;
	}

	@DeleteMapping("/posts/{id}")
	public ResponseEntity<String> deletePost(@PathVariable("id") long id) {
		System.out.println("Delete Post with ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("Post has been deleted!", HttpStatus.OK);
	}

	@DeleteMapping("/posts/delete")
	public ResponseEntity<String> deleteAllPosts() {
		System.out.println("Delete All Posts...");

		repository.deleteAll();

		return new ResponseEntity<>("All posts have been deleted!", HttpStatus.OK);
	}

	@GetMapping(value = "posts/titolo/{titolo}")
	public List<Post> findByTitolo(@PathVariable String titolo) {

		List<Post> posts = repository.findByTitolo(titolo);
		return posts;
	}

	@PutMapping("/posts/{id}")
	public ResponseEntity<Post> updatePost(@PathVariable("id") long id, @RequestBody Post post) {
		System.out.println("Update Post with ID = " + id + "...");

		Optional<Post> postData = repository.findById(id);

		if (postData.isPresent()) {
			Post _post = postData.get();
			_post.setTitolo(post.getTitolo());
			_post.setTesto(post.getTesto());
			_post.setLike(post.getLike());
			_post.setDislike(post.getDislike());
			return new ResponseEntity<>(repository.save(_post), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
