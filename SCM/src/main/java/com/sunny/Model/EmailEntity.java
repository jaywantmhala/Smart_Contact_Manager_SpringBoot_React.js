package com.sunny.Model;

public class EmailEntity {
 private String to;
 private String subject;
 private String message;
 
public EmailEntity(String message, String subject, String to) {
	super();
	this. to = to;
	this.subject = subject;
	this.message = message;
}

public EmailEntity() {
	super();
	// TODO Auto-generated constructor stub
}

/**
 * @return the from
 */
public String getTo() {
	return to;
}

/**
 * @param from the from to set
 */
public void setTo(String to) {
	this .to = to;
}

/**
 * @return the subject
 */
public String getSubject() {
	return subject;
}

/**
 * @param subject the subject to set
 */
public void setSubject(String subject) {
	this.subject = subject;
}

/**
 * @return the message
 */
public String getMessage() {
	return message;
}

/**
 * @param message the message to set
 */
public void setMessage(String message) {
	this.message = message;
}

@Override
public String toString() {
	return "EmailEntity [from=" + to + ", subject=" + subject + ", message=" + message + "]";
}
 
 
}
