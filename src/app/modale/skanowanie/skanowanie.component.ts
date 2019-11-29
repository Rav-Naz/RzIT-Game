import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { NfcService } from '~/app/nfc.service';

@Component({
  selector: 'ns-skanowanie',
  templateUrl: './skanowanie.component.html',
  styleUrls: ['./skanowanie.component.css'],
  moduleId: module.id,
})
export class SkanowanieComponent implements OnInit {

  private result: string = undefined;

  constructor(private modal: ModalDialogParams, private nfc: NfcService) { }

  ngOnInit() {
      this.nfc.nasluchuj().then(res => {
          this.result = res;
          this.zamknij()
      })
  }

  zamknij()
  {
      this.nfc.wylaczNasluch()
      this.modal.closeCallback(this.result)
  }


}
