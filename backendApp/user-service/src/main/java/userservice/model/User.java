package userservice.model;

import jakarta.persistence.*;


@Entity
@Table(name="user")
public class User {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private Long id;
   @Column(name="name")
   private String username;
   @Column(name="email")
   private String email;
   @Column(name = "pwd")
   private String pwd;
   @Column(name = "active")
   private Boolean active;

   public User() {
   }

   public User(String username, String email, String pwd) {
      this.username = username;
      this.email = email;
      this.pwd = pwd;
   }

   public Long getId() {
      return id;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getPwd() {
      return pwd;
   }

   public void setPwd(String pwd) {
      this.pwd = pwd;
   }

   public boolean isActive() {
      return active;
   }

   public void setActive(boolean active) {
      this.active = active;
   }

   @Override
   public String toString() {
      return "User {" +
              "id=" + id +
              ", username='" + username + '\'' +
              ", email='" + email + '\'' +
              ", pwd='" + pwd + '\'' +
              ", active=" + active +
              '}';
   }
}
