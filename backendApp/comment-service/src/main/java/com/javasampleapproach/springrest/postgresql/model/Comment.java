package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*
  {
    "testo": "Per me è cipolla",
    "autore": "Andre",
    "id": 4,
    "like": 15,
    "dislike": 1,
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

   @Column(name = "title")
   private String title;

   @Column(name = "text")
   private String text;

   @Column(name = "age")
   private int age;

   @Column(name = "active")
   private boolean active;

   public Comment() {
   }

   public Comment(String title, String text, int age) {
      this.title = title;
      this.text = text;
      this.age = age;
      this.active = false;
   }

   public long getId() {
      return id;
   }

   public void setTitle(String title) {
      this.title = title;
   }

   public String getTitle() {
      return this.title;
   }

   public void setText(String text) {
      this.text = text;
   }

   public String getText() {
      return this.text;
   }

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
      return "<comment> [id=" + id + ", title=" + title + ", age=" + age + ", active=" + active + "]";
   }
}
