package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
  {
    "id": 3,
    "titolo": "Conto deposito - Perchè?",
    "testo": "I BOT in perdita per carità, ma quale può essere una perdita reale su prodotti a scadenza breve?
               L’aumento del tasso deciso annualmente. Quindi se tu avevi un BOT che rendeva 2% in 9 mesi e l’aumento dei tassi
               fa andare a rendere i bot 3% in 9 mesi (aumento folle) puoi o attender quei mesi o vendere in perdita di quella
               differenza di % di rendimento",
    "autore": "Lollo",
    "like": [1,2],
    "dislike": [0],
    "creato": "2021-03-25T00:00:00.000+00:00"
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

   @ElementCollection
   @Column(name = "like")
   private List<Integer> like;

   @ElementCollection
   @Column(name = "dislike")
   private List<Integer> dislike;

   @Column(name = "creato")
   private Date creato;


   public Post() {
   }

   public Post(String titolo, String testo, String autore) {
      this.titolo = titolo;
      this.testo = testo;
      this.autore = autore;
      this.like = new ArrayList<Integer>();
      this.dislike = new ArrayList<Integer>();
      this.creato = new java.util.Date();
   }

   public Post(String titolo, String testo, String autore, List<Integer> like, List<Integer> dislike, Date creato) {
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

   public List<Integer> getLike() {
      return like;
   }

   public void setLike(List<Integer> like) {
      this.like = like;
   }

   public void giveLike(Integer userid) {
      if (this.dislike.contains(userid)) {
         this.dislike.remove(userid);
      }
      if (this.like.contains(userid)) {
         this.like.remove(userid);
      } else {
         this.like.add(userid);
      }
   }

   public List<Integer> getDislike() {
      return dislike;
   }

   public void setDislike(List<Integer> dislike) {
      this.dislike = dislike;
   }

   public void giveDislike(Integer userid) {
      if (this.like.contains(userid)) {
         this.like.remove(userid);
      }
      if (this.dislike.contains(userid)) {
         this.dislike.remove(userid);
      } else {
         this.dislike.add(userid);
      }
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
