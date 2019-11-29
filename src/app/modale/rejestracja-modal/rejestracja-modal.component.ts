import { Component, OnInit} from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from '~/app/ui.service';
import { HttpService } from '~/app/http.service';

@Component({
  selector: 'ns-rejestracja-modal',
  templateUrl: './rejestracja-modal.component.html',
  styleUrls: ['./rejestracja-modal.component.css'],
  moduleId: module.id,
})
export class RejestracjaModalComponent implements OnInit{

    formP: FormGroup;

  constructor(private modal: ModalDialogParams, private ui: UiService, private http: HttpService) { }


  numerValid: boolean = true;
  hasloValid: boolean = true;
  powtorzValid: boolean = true;
  rozne: boolean = false;

  odhaczone: boolean = false;

  ngOnInit(){

    this.formP = new FormGroup({
        numer: new FormControl(null, { updateOn:'change', validators: [Validators.required] }),
        haslo: new FormControl(null, { updateOn:'change', validators: [Validators.required] }),
        powtorz: new FormControl(null, { updateOn:'change', validators: [Validators.required] })
    });

    this.formP.get('numer').statusChanges.subscribe(status => {
        this.numerValid = status === 'VALID';
    });
    this.formP.get('haslo').statusChanges.subscribe(status => {
        this.hasloValid = status === 'VALID';
    });
    this.formP.get('powtorz').statusChanges.subscribe(status => {
        this.powtorzValid = status === 'VALID';
    });
  }

  zmienCheck(event)
  {
    this.odhaczone = event
  }

  zamknij()
  {
      this.modal.closeCallback()
    }

    zarejestruj()
    {
        this.rozne = false
        if(this.formP.get('haslo').value !== this.formP.get('powtorz').value)
        {
            this.rozne = true;
            return
        }
        this.http.rejestracja(this.formP.get('numer').value,this.formP.get('haslo').value).then(res => {
            this.zamknij()
            switch (res) {
                case 0:
                    this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1 ,2)
                    break;

                 case 1:
                    this.ui.pokazPowiadomienie('Sukces','Udało się utworzyć konto',0,2)
                break;

            case 2:
                this.ui.pokazPowiadomienie('Uwaga!', 'Użytkownik o tym numerze albumu już jest zarejestrowany',2,3)
                break;
            default:
                this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1 ,2)
                break;
        }
      })
  }
}
