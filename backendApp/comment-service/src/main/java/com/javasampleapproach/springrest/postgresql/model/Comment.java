package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.*;
import java.util.Date;

/*
  {
    "testo": "Per me è cipolla",
    "autore": "Andre",
    "id": 4,
    "like": 15,
    "dislike": 1,
    "postid": 0,
    "parentID": 3,
    "commcounter": 0,
    "level": 0
  }
*/

@Entity
@Table(name = "comment1")
public class Comment {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private long id;

   @Column(name = "testo")
   private String testo;

   @Column(name = "autore")
   private String autore;

   @Column(name = "like")
   private int like;

   @Column(name = "dislike")
   private int dislike;

   @Column(name = "postid")
   private int postid;

   @Column(name = "parentid")
   private int parentid;

   @Column(name = "level")
   private int level;

   @Column(name = "creato")
   private Date creato;

   public Comment() {
   }

   public Comment(String testo, String autore, int postid, int parentid, int level) {
      this.testo = testo;
      this.autore = autore;
      this.postid = postid;
      this.parentid = parentid;
      this.level = level;
      this.like = 0;
      this.dislike = 0;
      this.creato = new java.util.Date();
   }

   // Costruttore utilizzato nel config per inizializzare i commenti
   public Comment(String testo, String autore, int like, int dislike, int postid, int parentid, int level, Date creato) {
      this.testo = testo;
      this.autore = autore;
      this.postid = postid;
      this.parentid = parentid;
      this.level = level;
      this.like = like;
      this.dislike = dislike;
      this.creato = creato;
   }

   public long getId() {
      return id;
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

   public int getPostid() {
      return postid;
   }

   public void setPostid(int postid) {
      this.postid = postid;
   }

   public int getParentid() {
      return parentid;
   }

   public void setParentid(int parentid) {
      this.parentid = parentid;
   }

   public int getLevel() {
      return level;
   }

   public void setLevel(int level) {
      this.level = level;
   }

   public Date getCreato() {
      return creato;
   }

   public void setCreato(Date creato) {
      this.creato = creato;
   }

   @Override
   public String toString() {
      return "Comment{" +
              "id=" + id +
              ", testo='" + testo + '\'' +
              ", autore='" + autore + '\'' +
              ", like=" + like +
              ", dislike=" + dislike +
              ", postid=" + postid +
              ", parentid=" + parentid +
              ", level=" + level +
              ", creato=" + creato +
              '}';
   }
}
