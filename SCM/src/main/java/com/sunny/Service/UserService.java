package com.sunny.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunny.Model.User;
import com.sunny.Repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User updateUser(User user, int id) {
        user.setId(id);
        return userRepo.save(user);
    }

    public User authenticateUser(String email, String password) {
        Optional<User> optionalUser = userRepo.findByEmail(email);
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            return optionalUser.get();
        }
        return null;
    }
}
