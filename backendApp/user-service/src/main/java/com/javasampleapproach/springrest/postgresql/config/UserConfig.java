package com.javasampleapproach.springrest.postgresql.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.List;
import java.sql.Timestamp;
import java.util.Date;
import java.text.SimpleDateFormat;

import com.javasampleapproach.springrest.postgresql.model.User;
import com.javasampleapproach.springrest.postgresql.repo.UserRepository;

@Configuration
public class UserConfig {

   DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
   Date date1 = dateFormat.parse("23/09/2020");
   Date date2 = dateFormat.parse("25/03/2021");
   Date date3 = dateFormat.parse("06/07/2022");
   Date date4 = dateFormat.parse("15/09/2020");
   Date date5 = dateFormat.parse("15/08/2020");

   long time1 = date1.getTime();
   long time2 = date2.getTime();
   long time3 = date3.getTime();
   long time4 = date4.getTime();
   long time5 = date5.getTime();


   public UserConfig() throws ParseException {
   }

   @Bean
   CommandLineRunner commandLineRunner(UserRepository repository) {
      return args -> {
         User andrea = new User(
                 "Andre",
                 "pupopeligroso95",
                 "Andrea",
                 "Balbo Mossetto",
                 "him/him",
                 45,
                 "/assets/images/user2.png",
                 new Timestamp(time1)
         );
         User lorenzo = new User(
                 "Lollo",
                 "test",
                 "Lorenzo",
                 "Gianotti",
                 "him/him",
                 26,
                 "/assets/images/user3.png",
                 new Timestamp(time2)
         );
         User alice = new User(
                 "Ali",
                 "test",
                 "Alice",
                 "Pregnolato",
                 "him/him",
                 97,
                 "/assets/images/user1.png",
                 new Timestamp(time3)
         );
         User davide = new User(
                 "dave",
                 "pollo1234",
                 "Davide",
                 "Marietti",
                 "him/him",
                 29,
                 "/assets/images/user.png",
                 new Timestamp(time4)
         );
         User alex = new User(
                 "alex",
                 "eccomi231",
                 "Alex",
                 "Giovannoni",
                 "him/her",
                 37,
                 "/assets/images/user.png",
                 new Timestamp(time5)
         );

         repository.saveAll(
                 List.of(andrea, lorenzo, alice, davide, alex)
         );
      };
   }
}
