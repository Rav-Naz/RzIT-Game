import { Component} from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-rejestracja-modal',
  templateUrl: './rejestracja-modal.component.html',
  styleUrls: ['./rejestracja-modal.component.css'],
  moduleId: module.id,
})
export class RejestracjaModalComponent{

  constructor(private modal: ModalDialogParams) { }

  zamknij()
  {
      this.modal.closeCallback()
  }

  zarejestruj()
  {
      this.zamknij()
  }
}
