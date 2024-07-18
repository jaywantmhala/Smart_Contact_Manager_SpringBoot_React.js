package com.sunny.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunny.Model.EmailEntity;
import com.sunny.Service.EmailService;



@RestController
@CrossOrigin("*")
public class EmailController {

	@Autowired
	private EmailService emailservice;
	@PostMapping("/welcome")
	public String welcome() {
		return "Hello this is my email api";
	}
	
	
	
	
    @PostMapping("/sendemail")
	public ResponseEntity<?> sendEmail(@RequestBody EmailEntity emailentity){
		
		boolean result=this.emailservice.sendEmail(emailentity.getMessage() ,emailentity.getSubject(),emailentity.getTo());
		System.out.println(emailentity);
if(result) {
	return ResponseEntity.status(HttpStatus.OK).body("Email has sent successfully");

}
else {
	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email not sent");

}
	}
}
