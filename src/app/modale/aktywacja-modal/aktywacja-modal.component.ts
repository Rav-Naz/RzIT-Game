import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { UiService } from '~/app/ui.service';
import { HttpService } from '~/app/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ns-aktywacja-modal',
  templateUrl: './aktywacja-modal.component.html',
  styleUrls: ['./aktywacja-modal.component.css'],
  moduleId: module.id,
})
export class AktywacjaModalComponent implements OnInit{

  constructor(private modal: ModalDialogParams, private ui: UiService, private http: HttpService) { }

  form: FormGroup;

  kodValid: boolean = true;

  poprawny: boolean = true;
  wygaslo: boolean = false;

  ngOnInit(){

      this.form = new FormGroup({
        kod: new FormControl(null, { updateOn:'change', validators: [Validators.required ,Validators.pattern('^[0-9]{6}$')] }),
    });

    this.form.get('kod').statusChanges.subscribe(status => {
        this.kodValid = status === 'VALID';
    });
  }

  zamknij(callback?:string)
  {
      this.modal.closeCallback(callback)
  }

  aktywuj()
  {
    this.poprawny = true;
    this.wygaslo = false;
    this.http.aktywacja(this.modal.context, this.form.get('kod').value).then(res => {
        switch (res) {
            case 'niepoprawny':
                this.poprawny = false;
                break;

            case 'wygaslo':
                this.wygaslo = true;
                break;

            case 'aktywowany':
                this.zamknij("dalej")
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
