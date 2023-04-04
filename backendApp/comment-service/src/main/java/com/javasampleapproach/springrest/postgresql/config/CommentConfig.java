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
                 "Il contributo del datore è tutto fuorchè marginale. Parliamo di una media di 1,5% della retribuzione lorda, ovvero un +20% del tfr maturato annui (che ricordiamo essere il 6.9% della retribuziine lorda).\n" +
                         "\n" +
                         "Edit: aggiungo che se vuoi cambiare spesso mettere il tfr bel fondo negoziale del ccnl con contributo datoriale e poi chiederne il riscatto alle dimissioni per perdità requisiti per me è la cosa migliore",
                 "Lollo",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 0,
                 new Timestamp(time1)
         );
         Comment comment2 = new Comment(
                 "Non sono d’accordo con la postilla finale. potresti facilmente trovarti nella situazione in cui il controvalore è minore della cifra depositata, come sta succedendo a me in questo momento. Se si cambia spesso e si vuole liquidare ogni volta fare il fondo negoziale non ha senso e ti espone ai rischi della volatilità.",
                 "Andre",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 1,
                 new Timestamp(time2)
         );
         Comment comment3 = new Comment(
                 "È vero sicuramente ha il suo impatto.\n" +
                         "\n" +
                         "E dovrei anche considerare che in caso di riscatto avrei una tassazione importante lasciandolo in azienda.\n" +
                         "\n" +
                         "Ma data la necessità di avere una certa liquidità aggiuntiva a breve ha senso impegnarsi ora in un fondo?",
                 "Ale",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 1,
                 new Timestamp(time3)
         );
         Comment comment4 = new Comment(
                 "Puoi cominciare a guardare questa guida, dove spiegano come funzionano entrambi i metodi, e poi valutare:\n" +
                         "\n" +
                         "https://www.covip.it/per-il-cittadino/educazione-previdenziale/guida-introduttiva-alla-previdenza-complementare",
                 "Ali",
                 List.of(1, 2),
                 List.of(0),
                 1,
                 1,
                 new Timestamp(time4)
         );

         Comment comment5 = new Comment(
                 "Puoi cominciare a guardare questa guida, dove spiegano come funzionano entrambi i metodi, e poi valutare:\n" +
                         "\n" +
                         "https://www.covip.it/per-il-cittadino/educazione-previdenziale/guida-introduttiva-alla-previdenza-complementare",
                 "Lauretta",
                 List.of(1, 2),
                 List.of(3),
                 1,
                 0,
                 new Timestamp(time1)
         );

         Comment comment6 = new Comment(
                 "Grazie mille per la prospettiva.\n" +
                         "\n" +
                         "Non ho un Tfr pregresso da versare in quanto liquidato con l'ultimo cambio di lavoro.\n" +
                         "\n" +
                         "Ho un po' di soldi da parte di cui non ho necessità di utilizzo a stretto giro se non eventualmente per la casa. I quali pensavo di inserirli su un conto deposito 12 mesi.",
                 "Ali",
                 List.of(1, 2, 3, 5),
                 List.of(0),
                 1,
                 0,
                 new Timestamp(time1)
         );

         Comment comment7 = new Comment(
                 "Grazie, verifo la cosa.",
                 "Ale",
                 List.of(4, 5),
                 List.of(1),
                 1,
                 1,
                 new Timestamp(time3)
         );

         Comment comment8 = new Comment(
                 "Siamo nella stessa situazione, con la differenza che non ho cambiato azienda. Per il momento io l’ho lasciato in azienda il tfr, in futuro però penso di trasferirlo su un pac in modo che poi non resta bloccato per 8 anni",
                 "Lollo",
                 List.of(1, 2, 3, 4, 5),
                 List.of(0),
                 2,
                 2,
                 new Timestamp(time3)
         );

         Comment comment9 = new Comment(
                 "Siamo nella stessa situazione, con la differenza che non ho cambiato azienda. Per il momento io l’ho lasciato in azienda il tfr, in futuro però penso di trasferirlo su un pac in modo che poi non resta bloccato per 8 anni",
                 "Andre",
                 List.of(5),
                 List.of(1,2,3,4),
                 2,
                 2,
                 new Timestamp(time3)
         );

         Comment comment10 = new Comment(
                 "Esattamente la % per arrivare al massimo deducibile annuale",
                 "Ale",
                 List.of(5),
                 List.of(1,2,3,4),
                 2,
                 0,
                 new Timestamp(time3)
         );

         Comment comment11 = new Comment(
                 "Scusa la domanda un pò ignorante.. Conviene il massimo deducibile per ottimizzare la tassazione? Ma sempre? In qualsiasi scaglione?",
                 "Lollo",
                 List.of(5,2),
                 List.of(1,4),
                 10,
                 1,
                 new Timestamp(time1)
         );

         Comment comment12 = new Comment(
                 "Curiosità (banale, credo):\n" +
                         "\n" +
                         "Ad ogni aumento fai la procedura per rivedere la % di contributo volontario?",
                 "Ale",
                 List.of(5),
                 List.of(1,2,3,4),
                 10,
                 1,
                 new Timestamp(time4)
         );

         Comment comment13 = new Comment(
                 "Siamo nella stessa situazione, con la differenza che non ho cambiato azienda. Per il momento io l’ho lasciato in azienda il tfr, in futuro però penso di trasferirlo su un pac in modo che poi non resta bloccato per 8 anni",
                 "Lauretta",
                 List.of(1,2,3,4),
                 List.of(5),
                 12,
                 2,
                 new Timestamp(time3)
         );

         Comment comment14 = new Comment(
                 "Io metto il minimo per queste ragioni:\n" +
                         "\n" +
                         "    La mia generazione (anni '90), se mai ci arriverà, maturerà il diritto alla pensione in area 74 anni. Pertanto non avrò tutto questo tempo per \"godermi\" il mio fondo pensione.\n" +
                         "\n" +
                         "    Vivendo a Milano, per me è quasi impossibile pensare di rinunciare ad una parte dello stipendio, dato che ormai i costi sono arrivati a livelli folli su tutti i fronti (ed in prospettiva la situazione non migliorerà).\n" +
                         "\n" +
                         "    Con i livelli di inquinamento dell'aria, unitamente ad un SSN che si approccia al collasso, non mi stupirei se le mie condizioni di salute peggiorassero con il passare degli anni.",
                 "Lauretta",
                 List.of(3),
                 List.of(1,2),
                 12,
                 2,
                 new Timestamp(time3)
         );

         Comment comment15 = new Comment(
                 "Per il punto 1 puoi leggere del RITA.",
                 "Ale",
                 List.of(5),
                 List.of(1,2,3,4),
                 14,
                 3,
                 new Timestamp(time4)
         );

         Comment comment16 = new Comment(
                 "Io cerco di maxare i 5k annuali di deducibilità, ma conviene solo se hai il giusto mix di scaglione IRPEF alto e allocazione del fondo pensione decentemente rischiosa, altrimenti tra risparmio gestito e mille limiti rischia di essere una trappola.\n" +
                         "\n" +
                         "Puoi fare un check veloce se hai già in mente dei numeri sul mio comparatore qua: https://sossoldi.org/pac-o-fondo-pensione.html",
                 "Lollo",
                 List.of(5),
                 List.of(1,2,3,4),
                 14,
                 3,
                 new Timestamp(time1)
         );

         repository.saveAll(
                 List.of(comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16)
         );
      };
   }
}
