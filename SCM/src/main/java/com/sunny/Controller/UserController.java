package com.sunny.Controller;

import java.util.Map;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.sunny.Model.Contact;
import com.sunny.Model.User;
import com.sunny.Service.ContactService;
import com.sunny.Service.EmailService;
import com.sunny.Service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	
	
	
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user){
		User savedUser = this.userService.createUser(user);
		
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}")
	public User updateUser(@RequestBody User user, int id) {
		return this.userService.updateUser(user, id);
	}
	
	@PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        User user = userService.authenticateUser(email, password);
        if (user != null) {
            // Return user details if authentication is successful
            return ResponseEntity.ok(user);
        } else {
            // Return unauthorized status if authentication fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
	
	
	@PostMapping("/create_order")
	@ResponseBody
	public String createOrder(@RequestBody Map<String, Object> data) throws RazorpayException {
	    System.out.println("payment successfully");
	    System.out.println("Data: " + data);
	    int price = Integer.parseInt(data.get("amount").toString());
	    RazorpayClient client = new RazorpayClient("rzp_test_uKr7RDy0kmGmX6", "PmKs3ZlnD4eBY5jva5LMqtCf");
	    JSONObject ob = new JSONObject();
	    ob.put("amount", price * 100);
	    ob.put("currency", "INR");
	    ob.put("receipt", "txn_64656");

	    // Creating a new order
	    Order order = client.Orders.create(ob);
	    System.out.println(order);

	    return order.toString();
	}


}
	
	
	
	
    
	

