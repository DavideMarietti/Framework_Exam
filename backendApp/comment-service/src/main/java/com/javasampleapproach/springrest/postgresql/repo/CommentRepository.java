package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {
	List<Comment> findByAge(int age);
}

