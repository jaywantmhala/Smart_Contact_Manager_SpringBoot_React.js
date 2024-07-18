package com.sunny.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

import com.sunny.Model.Contact;
import com.sunny.Model.User;
import com.sunny.Repo.ContactRepository;
import com.sunny.Repo.UserRepository;

@Service
public class ContactService {

	
	@Autowired
	private ContactRepository contactRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	public Contact createContact(Contact contact, int id) {
		User user   =  this.userRepo.findById(id);
		contact.setUser(user);
		return this.contactRepo.save(contact);
		
	}
	
	
	public List<Contact> getAllContactByUserId(int userId) {
        return this.contactRepo.findByUserId(userId);
    }
	
	public void deleteContact(int id) {
		this.contactRepo.deleteById(id);
	}
	
	public Contact updateContact(Contact contact, int id, int userId) {
		User user   =  this.userRepo.findById(userId);
		contact.setUser(user);		
		contact.setId(contact.getId());
		return this.contactRepo.save(contact);
	}
	
	public Contact getContactById(int id) throws NotFoundException {
        Optional<Contact> optionalContact = contactRepo.findById(id);
        if (optionalContact.isPresent()) {
            return optionalContact.get();
        } else {
            throw new NotFoundException();
        }
    }

	
	
}
