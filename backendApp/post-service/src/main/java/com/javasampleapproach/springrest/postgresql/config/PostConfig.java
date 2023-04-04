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

   Date date3 = dateFormat.parse("23/12/2022");

   long time1 = date1.getTime();
   long time2 = date2.getTime();
   long time3 = date3.getTime();

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
                 List.of(1, 2, 3, 5),
                 List.of(4),
                 new Timestamp(time1)
         );
         Post post2 = new Post(
                 "Quanto versate nel fondo pensione (escluso tfr)",
                 "Vari articoli che ho letto online consigliavano un 10% ma mi sembra tantino (soprattutto se già si investe per conto proprio) voi quanto versate ?",
                 "Lollo",
                 List.of(4),
                 List.of(1,2,3),
                 new Timestamp(time2)
         );
         Post post3 = new Post(
                 "Offerta di lavoro negli USA a 23 anni",
                 "Ciao a tutti,\n" +
                         "\n" +
                         "Volevo chiedere un vostro parere. Mi è stato proposto di recente di trasferirmi in una delle principali città della NorthCarolina, per circa 3 anni, per conto dell'azienda per la quale attualmente lavoro in Italia.\n" +
                         "\n" +
                         "Devo ancora confermare all'azienda il mio interesse a trasferirmi, ma volevo sentire dei pareri dall'internette :) Una volta confermato l'interesse mi farebbero una proposta ufficiale con RAL e tutto il resto.\n" +
                         "\n" +
                         "Lavoro nel settore costumer service da quando ho 19 anni e attualmente guadagno 26K lordi. Non sono laureato.\n" +
                         "\n" +
                         "Il lavoro proposto è allettante e sicuramente quando tornerei (se torno) avrei un curriculum invidiabile.\n" +
                         "\n" +
                         "Quanto sarebbe un RAL accettabile? / Cosa posso aspettarmi? Cosa dovrei chiedere? E' un esperienza che mi consigliate? Qualche pro e contro di pancia??\n" +
                         "\n" +
                         "Attendo vostre, se servono altre info fatemi sapere",
                 "Ali",
                 List.of(),
                 List.of(1,2,4),
                 new Timestamp(time3)
         );

         repository.saveAll(
                 List.of(post1, post2, post3)
         );
      };
   }
}
