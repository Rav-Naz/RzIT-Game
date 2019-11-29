import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from 'tns-core-modules/ui/page/page';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';
import { RejestracjaModalComponent } from '../modale/rejestracja-modal/rejestracja-modal.component';
import { Nfc } from 'nativescript-nfc';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  constructor(private router: RouterExtensions, private page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef) { }

  avail: boolean = false;
  nfc: Nfc;

  formP: FormGroup;

  numerValid: boolean = true;
  hasloValid: boolean = true;

  ngOnInit() {
    this.page.actionBarHidden = true;
    let nfc = new Nfc();
    nfc.available().then((avail) => {
        this.avail = avail
    });

    this.formP = new FormGroup({
        numer: new FormControl(null, { updateOn:'change', validators: [Validators.pattern('^[0-9]{6}$')] }),
        haslo: new FormControl(null, { updateOn:'change', validators: [Validators.required] })
    });

    this.formP.get('numer').statusChanges.subscribe(status => {
        this.numerValid = status === 'VALID';
    });
    this.formP.get('haslo').statusChanges.subscribe(status => {
        this.hasloValid = status === 'VALID';
    });
  }

  zaloguj()
  {
    this.router.navigate(['/menu'], {transition: {name: 'slideTop', duration: 500}, clearHistory: true})
  }

  rejestracja()
  {
    this.modal.showModal(RejestracjaModalComponent, {
        context: null,
        viewContainerRef: this.vcRef,
        fullscreen: false,
        stretched: false,
        animated: true,
        closeCallback: null,
        dimAmount: 0.7 // Sets the alpha of the background dim,

    } as ExtendedShowModalOptions).then()
  }


}
