package com.sunny.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Contact {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String fullName;
	
	private String nickName;
	
	private int phone;
	
	private String occupation;
	
	private String email;

	
	@ManyToOne
	@JsonIgnore
	private User user;
	
	

	public Contact(int id, String fullName, String nickName, int phone, String occupation, String email, User user) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.nickName = nickName;
		this.phone = phone;
		this.occupation = occupation;
		this.email = email;
		this.user = user;
	}

	public Contact() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Contact [id=" + id + ", fullName=" + fullName + ", nickName=" + nickName + ", phone=" + phone
				+ ", occupation=" + occupation + ", email=" + email + "]";
	}
	
	
}
