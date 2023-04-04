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

import com.javasampleapproach.springrest.postgresql.model.Post;
import com.javasampleapproach.springrest.postgresql.repo.PostRepository;

@Configuration
public class PostConfig {
   DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
   Date date1 = dateFormat.parse("23/09/2020");
   Date date2 = dateFormat.parse("25/03/2021");

   long time1 = date1.getTime();
   long time2 = date2.getTime();

   public PostConfig() throws ParseException {
   }

   @Bean
   CommandLineRunner commandLineRunner(PostRepository repository) {
      return args -> {
         Post post1 = new Post(
                 "Fondo pensione o Tfr in azienda?",
                 "Buongiorno a tutti.\n" +
                         "\n" +
                         "Ho cambiato lavoro a dicembre e devo pensare alla destinazione del Tfr.\n" +
                         "\n" +
                         "In azienda si usa Fondapi ma potrei anche optare per Cometa.\n" +
                         "\n" +
                         "Mi sorge però il dubbio che almeno quest'anno non convenga lasciare il tutto in azienda visto che in teoria dovrei avere un rendimento del 1,5% + 0,75*(11,6) (tasso inflazione dicembre 2022).\n" +
                         "\n" +
                         "Totale 10,2%.\n" +
                         "\n" +
                         "Cifra che non raggiungerei sui fondi nemmeno con piani azionari.\n" +
                         "\n" +
                         "Mi perderei il contributo aggiuntivo del datore ma rimarrebbe marginale.\n" +
                         "\n" +
                         "Inoltre con la prospettiva di comprare casa tra 1-2 anni la somma sarebbe più libera in azienda piuttosto che in un fondo che la terrebbe bloccata per i primi 8 anni.\n" +
                         "\n" +
                         "dite che potrebbe essere la scelta migliore?\n" +
                         "\n" +
                         "È possibile aprire una posizione su un fondo e versare solo una piccola quota del Tfr + contributo minimo per avere il contributo extra (1-2%)del datore?\n" +
                         "\n" +
                         "Per contesto: ho 25 anni, ral 30k, e non mi sento particolarmente affascinato dal posto fisso. Anzi l'idea sarà di cambiare ogni tot anni.\n" +
                         "\n" +
                         "Grazie a tutti quelli che potranno aiutarmi.",
                 "Andre",
                 List.of(1, 2),
                 List.of(0),
                 new Timestamp(time1)
         );
         Post post2 = new Post(
                 "Conto deposito - Perchè?",
                 "I BOT in perdita per carità, ma quale può essere una perdita reale su prodotti a scadenza breve? L’aumento del tasso deciso annualmente. Quindi se tu avevi un BOT che rendeva 2% in 9 mesi e l’aumento dei tassi fa andare a rendere i bot 3% in 9 mesi (aumento folle) puoi o attender quei mesi o vendere in perdita di quella differenza di % di rendimento",
                 "Lollo",
                 List.of(1, 2),
                 List.of(0),
                 new Timestamp(time2)
         );

         repository.saveAll(
                 List.of(post1, post2)
         );
      };
   }
}
