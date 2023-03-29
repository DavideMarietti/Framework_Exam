package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.Post;

public interface PostRepository extends CrudRepository<Post, Long> {
   List<Post> findByTitolo(String titolo);
}

