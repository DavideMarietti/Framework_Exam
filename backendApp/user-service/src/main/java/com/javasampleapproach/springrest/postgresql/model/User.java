package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.*;
import java.util.Date;

/*
  {
    "username": "Ali",
    "password": "test",
    "nome": "Alice",
    "cognome": "Pregnolato",
    "sesso": "Donna",
    "eta": 97,
    "image": "/assets/images/user.png"
  }
*/

@Entity
@Table(name = "user1")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "nome")
	private String nome;

	@Column(name = "cognome")
	private String cognome;

	@Column(name = "sesso")
	private String sesso;

	@Column(name = "eta")
	private int eta;

	@Column(name = "image")
	private String image;

	@Column(name = "iscrizione")
	private Date iscrizione;

	public User() {
	}

	// Todo: l'immagine al momento e forzata, creare ma verrà caricata al momento
	public User(String username, String password, String nome, String cognome,
					String sesso, int eta) {
		this.username = username;
		this.password = password;
		this.nome = nome;
		this.cognome = cognome;
		this.sesso = sesso;
		this.eta = eta;
		this.image = "/assets/images/user.png";
		this.iscrizione = new java.util.Date();
	}

	// Costruttore utilizzato nel config per inizializzare gli utenti
	public User(String username, String password, String nome, String cognome,
					String sesso, int eta, String image, Date iscrizione) {
		this.username = username;
		this.password = password;
		this.nome = nome;
		this.cognome = cognome;
		this.sesso = sesso;
		this.eta = eta;
		this.image = image;
		this.iscrizione = iscrizione;
	}

	public long getId() {
		return id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() { return this.password; }

	public void setPassword(String password) { this.password = password; }

	public String getNome() { return this.nome; }

	public void setNome(String nome) { this.nome = nome; }

	public String getCognome() { return this.cognome; }

	public void setCognome(String cognome) { this.cognome = cognome; }

	public String getSesso() { return this.sesso; }

	public void setSesso(String sesso) { this.sesso = sesso; }

	public int getEta() {
		return this.eta;
	}

	public void setEta(int eta) {
		this.eta = eta;
	}

	public String getImage() { return this.image; }

	public void setImage(String image) { this.image = image; }

	public Date getIscrizione() { return this.iscrizione; }

	public void setIscrizione(Date iscrizione) { this.iscrizione = iscrizione; }

	@Override
	public String toString() {
		return "User{" +
				"id=" + id +
				", username='" + username + '\'' +
				", password='" + password + '\'' +
				", nome='" + nome + '\'' +
				", cognome='" + cognome + '\'' +
				", sesso='" + sesso + '\'' +
				", eta=" + eta +
				", image='" + image + '\'' +
				", iscrizione='" + iscrizione + '\'' +
				'}';
	}
}
