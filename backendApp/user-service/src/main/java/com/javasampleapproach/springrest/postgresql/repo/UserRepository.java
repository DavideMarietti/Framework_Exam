package com.javasampleapproach.springrest.postgresql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.javasampleapproach.springrest.postgresql.model.User;


// Responsible for customized data access
public interface UserRepository extends CrudRepository<User, Long> {
	List<User> findByEta(int eta);
}

