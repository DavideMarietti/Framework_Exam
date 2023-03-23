package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
	List<User> findByAge(int age);
}

