import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { UiService } from '~/app/ui.service';
import { HttpService } from '~/app/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ns-zapomnialem-modal',
  templateUrl: './zapomnialem-modal.component.html',
  styleUrls: ['./zapomnialem-modal.component.css'],
  moduleId: module.id,
})
export class ZapomnialemModalComponent implements OnInit {

    constructor(private modal: ModalDialogParams, private ui: UiService, private http: HttpService) { }

    form: FormGroup;

    kodValid: boolean = true;

    istnieje: boolean = true;
    aktywne: boolean = true;

    ngOnInit(){

        this.form = new FormGroup({
          numer: new FormControl(null, { updateOn:'change', validators: [Validators.required ,Validators.pattern('^[0-9]{6}$')] }),
      });

      this.form.get('numer').statusChanges.subscribe(status => {
          this.kodValid = status === 'VALID';
      });
    }

    zamknij(callback?:string)
    {
        this.modal.closeCallback(callback)
    }

    wyslij()
    {
      this.istnieje = true;
      this.aktywne = true;
      this.http.zapomnialem(this.form.get('numer').value).then(res => {
          switch (res) {
              case 'brak':
                  this.istnieje = false;
                  break;

              case 'nieaktywne':
                  this.aktywne = false;
                  break;

              case 'blad':
                  this.zamknij("blad")
                  break;

              default:
                  this.zamknij("blad")
                  break;
          }
      })
    }
}
