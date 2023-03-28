package com.javasampleapproach.springrest.postgresql.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

   @Column(name = "title")
   private String title;

   @Column(name = "text")
   private String text;

   @Column(name = "age")
   private int age;

   @Column(name = "active")
   private boolean active;

   public Post() {
   }

   public Post(String title, String text, int age) {
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
      return "Post [id=" + id + ", title=" + title + ", age=" + age + ", active=" + active + "]";
   }
}
