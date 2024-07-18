package com.sunny.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunny.Model.Contact;
import com.sunny.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	public User findById(int id);
	
    Optional<User> findByEmail(String email);

	
}
