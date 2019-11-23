import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-skanowanie',
  templateUrl: './skanowanie.component.html',
  styleUrls: ['./skanowanie.component.css'],
  moduleId: module.id,
})
export class SkanowanieComponent implements OnInit {

  constructor(private modal: ModalDialogParams) { }

  ngOnInit() {
  }

  zamknij()
  {
      this.modal.closeCallback()
  }


}
