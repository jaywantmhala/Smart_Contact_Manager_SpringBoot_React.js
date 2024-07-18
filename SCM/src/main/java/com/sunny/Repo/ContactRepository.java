package com.sunny.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunny.Model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer>{

    List<Contact> findByUserId(int userId);

}
