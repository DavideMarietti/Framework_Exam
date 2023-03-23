import {Component, Input} from '@angular/core';
import {Comment, Controller, Thread, Utente} from "../../../variable-type";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent {
  @Input() user: Utente;
  @Input() control: Controller;

  thread = new Thread("Riflessioni sulla banche","Aldilà degli investimenti credo sia un sub per appassionati di finanza dove si possa analizzare anche più in generale l'andamento dei mercati.\nVorrei conoscere il vostro parere sulla situazione banche oggi. Per quello che mi riguarda ho diversi dubbi.\nPrimo: essendo aziende private posso chiaramente fallire e lo abbiamo visto negli ultimi giorni, però il fallimento di una banca non è visto come risultato di un mercato efficiente (ovvero chi non è capace per diversi motivi di fare quel tipo di business viene buttato fuori e chiude) ma come problema economico. Perché UBS non è contenta delle disgrazie di CS? Ha praticamente eliminato il suo primo competitor dal mercato. In ogni altro settore si farebbe festa. Qui no, come mai?\nSecondo punto: quando le banche vanno bene i profitti sono dei privati mentre quando falliscono (o vengono comprate) le perdite vengono coperte dalle Banche Centrali / Stati nazionali. A questo punto tanto vale avere una banca unica nazionale/europea visto che ormai è pacifico che il sistema autoproduce delle distorsioni tali che l'intervento esterno è periodicamente necessario e alla fine pagano sempre i contribuenti. Inoltre, a me sembra che questo comportamento favorisca il cosiddetto moral hazard ovvero semplificando facciamo le cose a cazzo tanto i danni li paga sempre qualcun'altro e noi caschiamo in piedi.\nTerzo punto: come fanno le BC a garantire liquidità al sistema e allo stesso tempo fare scendere l'inflazione? Cioè inondare il sistema di liquidità è l'esatto opposto dell'aumento dei tassi. Non mi è chiaro come le due cose possano convivere. Qualcuno me lo può spiegare?", "ArduTQ", 9, 12);
  comment2 = new Comment("Per me è la cipolla", "alice", 1, 2, 1);
  comment3 = new Comment("sono le 3 passate PD", "lorenzo", 1, 3, 0);

  expand() {
    this.thread.expandthread = !this.thread.expandthread;
  }

  expand_comments() {
    this.thread.opencomments = !this.thread.opencomments;
  }

  reactionControl(value: boolean) {
    if(this.control.autenticato){
      if(value){
        this.thread.like++;
      }else{
        this.thread.dislike++;
      }
    }
  }


}
