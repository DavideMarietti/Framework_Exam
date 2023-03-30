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

import com.javasampleapproach.springrest.postgresql.model.Comment;
import com.javasampleapproach.springrest.postgresql.repo.CommentRepository;

@Configuration
public class CommentConfig {
   DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
   Date date1 = dateFormat.parse("23/09/2020");
   Date date2 = dateFormat.parse("25/03/2021");
   Date date3 = dateFormat.parse("06/07/2022");
   Date date4 = dateFormat.parse("15/09/2020");

   long time1 = date1.getTime();
   long time2 = date2.getTime();
   long time3 = date3.getTime();
   long time4 = date4.getTime();

   public CommentConfig() throws ParseException {
   }

   @Bean
   CommandLineRunner commandLineRunner(CommentRepository repository) {
      return args -> {
         Comment comment1 = new Comment(
                 "Hey bro! Sei un grande!!",
                 "Lollo",
                 List.of(1, 2),
                 List.of(0),
                 0,
                 1,
                 0,
                 new Timestamp(time1)
         );
         Comment comment2 = new Comment(
                 "Per me è cipolla",
                 "Andre",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 3,
                 0,
                 new Timestamp(time2)
         );
         Comment comment3 = new Comment(
                 "A me piacciono i treni",
                 "Lollo",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 2,
                 0,
                 new Timestamp(time3)
         );
         Comment comment4 = new Comment(
                 "terzo commento test",
                 "Alice",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 5,
                 0,
                 new Timestamp(time4)
         );


         repository.saveAll(
                 List.of(comment1, comment2, comment3, comment4)
         );
      };
   }
}
