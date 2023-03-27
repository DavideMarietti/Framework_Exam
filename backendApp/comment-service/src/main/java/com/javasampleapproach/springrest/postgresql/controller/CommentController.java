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

import com.javasampleapproach.springrest.postgresql.model.Comment;
import com.javasampleapproach.springrest.postgresql.repo.CommentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CommentController {

	@Autowired
	CommentRepository repository;

	@GetMapping("/comments")
	public List<Comment> getAllComments() {
		System.out.println("Get all Comments...");

		List<Comment> comments = new ArrayList<>();
		repository.findAll().forEach(comments::add);

		return comments;
	}

	@PostMapping(value = "/comments/create")
	public Comment commentComment(@RequestBody Comment comment) {

		Comment _comment = repository.save(new Comment(comment.getTitle(), comment.getText(), comment.getAge()));
		return _comment;
	}

	@DeleteMapping("/comments/{id}")
	public ResponseEntity<String> deleteComment(@PathVariable("id") long id) {
		System.out.println("Delete Comment with ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("Comment has been deleted!", HttpStatus.OK);
	}

	@DeleteMapping("/comments/delete")
	public ResponseEntity<String> deleteAllComments() {
		System.out.println("Delete All Comments...");

		repository.deleteAll();

		return new ResponseEntity<>("All comments have been deleted!", HttpStatus.OK);
	}

	@GetMapping(value = "comments/age/{age}")
	public List<Comment> findByAge(@PathVariable int age) {

		List<Comment> comments = repository.findByAge(age);
		return comments;
	}

	@PutMapping("/comments/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable("id") long id, @RequestBody Comment comment) {
		System.out.println("Update Comment with ID = " + id + "...");

		Optional<Comment> commentData = repository.findById(id);

		if (commentData.isPresent()) {
			Comment _comment = commentData.get();
			_comment.setTitle(comment.getTitle());
			_comment.setText(comment.getText());
			_comment.setAge(comment.getAge());
			_comment.setActive(comment.isActive());
			return new ResponseEntity<>(repository.save(_comment), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
