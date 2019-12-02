import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { UiService } from '~/app/ui.service';
import { HttpService } from '~/app/http.service';
import { DaneService } from '~/app/dane.service';

@Component({
  selector: 'ns-zmien-haslo-modal',
  templateUrl: './zmien-haslo-modal.component.html',
  styleUrls: ['./zmien-haslo-modal.component.css'],
  moduleId: module.id,
})
export class ZmienHasloModalComponent implements OnInit {

    formP: FormGroup;

    constructor(private modal: ModalDialogParams, private ui: UiService, private http: HttpService, private dane: DaneService) { }


    terazValid: boolean = true;
    noweValid: boolean = true;
    powtorzValid: boolean = true;
    rozne: boolean = false;
    niepoprawne: boolean = false;

    odhaczone: boolean = false;

    ngOnInit() {

        this.formP = new FormGroup({
            teraz: new FormControl(null, { updateOn: 'change', validators: [Validators.required, Validators.minLength(3)] }),
            nowe: new FormControl(null, { updateOn: 'change', validators: [Validators.required, Validators.minLength(3)] }),
            powtorz: new FormControl(null, { updateOn: 'change', validators: [Validators.required, Validators.minLength(3)] })
        });

        this.formP.get('teraz').statusChanges.subscribe(status => {
            this.terazValid = status === 'VALID';
        });
        this.formP.get('nowe').statusChanges.subscribe(status => {
            this.noweValid = status === 'VALID';
        });
        this.formP.get('powtorz').statusChanges.subscribe(status => {
            this.powtorzValid = status === 'VALID';
        });
    }

    zamknij() {
        this.modal.closeCallback()
    }

    zmienHaslo() {
        this.rozne = false
        this.niepoprawne = false
        if (this.formP.get('nowe').value !== this.formP.get('powtorz').value) {
            this.rozne = true;
            return
        }
       this.dane.zmienHaslo(this.formP.get('teraz').value, this.formP.get('nowe').value).then(res => {
            switch (res) {
                case 0:
                    this.zamknij()
                    this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1, 2)
                    break;

                case 1:
                    this.zamknij()
                    this.ui.pokazPowiadomienie('Sukces!', 'Udało się zmienić hasło', 0, 2)
                    break;

                case 2:
                    this.niepoprawne = true
                    break;
                default:
                    this.zamknij()
                    this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1, 2)
                    break;
            }
        })
    }
}
