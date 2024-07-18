package com.sunny.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.Model.Contact;
import com.sunny.Service.ContactService;

@RestController
@CrossOrigin("*")

public class ContactController {

	
	@Autowired
	private ContactService contactService;
	
	@PostMapping("/{id}")
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact, @PathVariable int id){
		Contact saveContact = this.contactService.createContact(contact, id);
		return new ResponseEntity<>(saveContact, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/{userId}")
    public ResponseEntity<List<Contact>> getAllContactsByUserId(@PathVariable int userId) {
        List<Contact> contacts = contactService.getAllContactByUserId(userId);
        return ResponseEntity.ok(contacts);
    }
	
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable int id) {
		this.contactService.deleteContact(id);
	}
	
	@PutMapping("/{userId}/{id}")
	public Contact udpateContact(@RequestBody Contact contact, @PathVariable int id,@PathVariable int userId) {
		return this.contactService.updateContact(contact, id,userId);
	}
	
	@GetMapping("/contact/{id}")
    public ResponseEntity<Contact> getSingleContact(@PathVariable int id) throws NotFoundException {
        Contact contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

	

	
}
