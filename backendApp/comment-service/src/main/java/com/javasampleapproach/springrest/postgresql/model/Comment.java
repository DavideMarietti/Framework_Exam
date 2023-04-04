package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
  {
    "testo": "Per me è cipolla",
    "autore": "Andre",
    "id": 4,
    "like": [1,2,3],
    "dislike": [4],
    "parentid": 3,
    "level": 0,
    "creato": "2021-03-25T00:00:00.000+00:00"
  }
*/

@Entity
@Table(name = "comment1")
public class Comment {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private long id;

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

   @Column(name = "parentid")
   private int parentid;

   @Column(name = "level")
   private int level;

   @Column(name = "creato")
   private Date creato;

   public Comment() {
   }

   public Comment(String testo, String autore, int parentid, int level) {
      this.testo = testo;
      this.autore = autore;
      this.parentid = parentid;
      this.level = level;
      this.like = new ArrayList<Integer>();
      this.dislike = new ArrayList<Integer>();
      this.creato = new java.util.Date();
   }

   // Costruttore utilizzato nel config per inizializzare i commenti
   public Comment(String testo, String autore, List<Integer> like, List<Integer> dislike, int parentid,
                  int level, Date creato) {
      this.testo = testo;
      this.autore = autore;
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
              ", parentid=" + parentid +
              ", level=" + level +
              ", creato=" + creato +
              '}';
   }
}
