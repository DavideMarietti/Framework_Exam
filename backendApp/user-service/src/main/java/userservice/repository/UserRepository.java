package userservice.repository;

import org.springframework.data.repository.CrudRepository;
import userservice.model.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
   List<User> findByAge(int age);
}