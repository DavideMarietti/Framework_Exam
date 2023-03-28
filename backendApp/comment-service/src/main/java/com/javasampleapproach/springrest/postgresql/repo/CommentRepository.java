package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.Comment;


// Responsible for customized data access
public interface CommentRepository extends CrudRepository<Comment, Long> {
	List<Comment> findByAuthor(String author);
}

