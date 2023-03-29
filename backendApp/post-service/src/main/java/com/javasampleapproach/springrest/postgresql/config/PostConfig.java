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
                 "Riflessioni sulle banche",
                 "Aldilà degli investimenti credo sia un sub per appassionati di finanza dove si possa analizzare anche più in generale l'andamento dei mercati.\nVorrei conoscere il vostro parere sulla situazione banche oggi. Per quello che mi riguarda ho diversi dubbi.\nPrimo: essendo aziende private posso chiaramente fallire e lo abbiamo visto negli ultimi giorni, però il fallimento di una banca non è visto come risultato di un mercato efficiente (ovvero chi non è capace per diversi motivi di fare quel tipo di business viene buttato fuori e chiude) ma come problema economico. Perché UBS non è contenta delle disgrazie di CS? Ha praticamente eliminato il suo primo competitor dal mercato. In ogni altro settore si farebbe festa. Qui no, come mai?\nSecondo punto: quando le banche vanno bene i profitti sono dei privati mentre quando falliscono (o vengono comprate) le perdite vengono coperte dalle Banche Centrali / Stati nazionali. A questo punto tanto vale avere una banca unica nazionale/europea visto che ormai è pacifico che il sistema autoproduce delle distorsioni tali che l'intervento esterno è periodicamente necessario e alla fine pagano sempre i contribuenti. Inoltre, a me sembra che questo comportamento favorisca il cosiddetto moral hazard ovvero semplificando facciamo le cose a cazzo tanto i danni li paga sempre qualcun'altro e noi caschiamo in piedi.\nTerzo punto: come fanno le BC a garantire liquidità al sistema e allo stesso tempo fare scendere l'inflazione? Cioè inondare il sistema di liquidità è l'esatto opposto dell'aumento dei tassi. Non mi è chiaro come le due cose possano convivere. Qualcuno me lo può spiegare?",
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
