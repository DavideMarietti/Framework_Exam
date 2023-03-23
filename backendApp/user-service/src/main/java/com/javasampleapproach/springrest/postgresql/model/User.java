package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user1")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	@Column(name = "pwd")
	private String pwd;

	@Column(name = "age")
	private int age;

	@Column(name = "active")
	private boolean active;

	public User() {
	}

	public User(String username, String email, String pwd, int age) {
		this.username = username;
		this.email = email;
		this.pwd = pwd;
		this.age = age;
		this.active = false;
	}

	public long getId() {
		return id;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return this.username;
	}

	public String getEmail() { return this.email; }

	public void setEmail(String email) { this.email = email; }

	public String getPwd() { return this.pwd; }

	public void setPwd(String pwd) { this.pwd = pwd; }

	public void setAge(int age) {
		this.age = age;
	}

	public int getAge() {
		return this.age;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", pwd=" + pwd + ", age=" + age + ", active=" + active + "]";
	}
}
