package com.sunny.Model;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String fullName;
	
	private String email;
	
	private String password;
	
	private String occupation;
	
	private int phone;
	
	private String image;
	
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="user" ,fetch=FetchType.LAZY)
	private List<Contact> contact;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int id, String fullName, String email, String password, String occupation, int phone, String image) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.occupation = occupation;
		this.phone = phone;
		this.image = image;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getoccupation() {
		return occupation;
	}

	public void setoccupation(String occupation) {
		this.occupation = occupation;
	}

	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", fullName=" + fullName + ", email=" + email + ", password=" + password + ", occupation="
				+ occupation + ", phone=" + phone + ", image=" + image + "]";
	}
	
	
	
	
}
