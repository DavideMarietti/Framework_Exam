package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/*
  {
    "id": 3,
    "titolo": "Conto deposito - Perchè?",
    "testo": "I BOT in perdita per carità, ma quale può essere una perdita reale su prodotti a scadenza breve?
               L’aumento del tasso deciso annualmente. Quindi se tu avevi un BOT che rendeva 2% in 9 mesi e l’aumento dei tassi
               fa andare a rendere i bot 3% in 9 mesi (aumento folle) puoi o attender quei mesi o vendere in perdita di quella
               differenza di % di rendimento",
    "autore": "Lollo",
    "like": 15,
    "dislike": 7,
    "commcounter": 0
  }
 */

@Entity
@Table(name = "post1")
public class Post {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private long id;

   @Column(name = "titolo")
   private String titolo;

   @Column(name = "testo", length = 2048)
   private String testo;

   @Column(name = "autore")
   private String autore;

   @Column(name = "like")
   private int like;

   @Column(name = "dislike")
   private int dislike;

   @Column(name = "creato")
   private Date creato;


   public Post() {
   }

   public Post(String titolo, String testo, String autore) {
      this.titolo = titolo;
      this.testo = testo;
      this.autore = autore;
      this.like = 0;
      this.dislike = 0;
      this.creato = new java.util.Date();
   }

   public Post(String titolo, String testo, String autore, int like, int dislike, Date creato) {
      this.titolo = titolo;
      this.testo = testo;
      this.autore = autore;
      this.like = like;
      this.dislike = dislike;
      this.creato = creato;
   }

   public long getId() {
      return id;
   }

   public void setId(long id) {
      this.id = id;
   }

   public String getTitolo() {
      return titolo;
   }

   public void setTitolo(String titolo) {
      this.titolo = titolo;
   }

   public String getTesto() {
      return testo;
   }

   public void setTesto(String testo) {
      this.testo = testo;
   }

   public String getAutore() {
      return autore;
   }

   public void setAutore(String autore) {
      this.autore = autore;
   }

   public int getLike() {
      return like;
   }

   public void setLike(int like) {
      this.like = like;
   }

   public int getDislike() {
      return dislike;
   }

   public void setDislike(int dislike) {
      this.dislike = dislike;
   }

   public Date getCreato() {
      return creato;
   }

   public void setCreato(Date creato) {
      this.creato = creato;
   }

   @Override
   public String toString() {
      return "Post{" +
              "id=" + id +
              ", titolo='" + titolo + '\'' +
              ", testo='" + testo + '\'' +
              ", autore='" + autore + '\'' +
              ", like=" + like +
              ", dislike=" + dislike +
              ", creato=" + creato +
              '}';
   }
}
