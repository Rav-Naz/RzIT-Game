import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '@nativescript/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';
import { RejestracjaModalComponent } from '../modale/rejestracja-modal/rejestracja-modal.component';
import { Nfc } from 'nativescript-nfc';
import { HttpService } from '../http.service';
import { UiService } from '../ui.service';
import { AktywacjaModalComponent } from '../modale/aktywacja-modal/aktywacja-modal.component';
import { ZapomnialemModalComponent } from '../modale/zapomnialem-modal/zapomnialem-modal.component';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  constructor(private router: RouterExtensions, private page: Page, private modal: ModalDialogService,
    private vcRef: ViewContainerRef, private http: HttpService, private ui: UiService) { }

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
        numer: new FormControl(null, { updateOn:'change', validators: [Validators.required,Validators.pattern('^[0-9]{6}$')] }),
        haslo: new FormControl(null, { updateOn:'change', validators: [Validators.required,Validators.minLength(3)] })
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
    this.http.logowanie(this.formP.get('numer').value,this.formP.get('haslo').value).then(res => {
        switch (res) {
            case 'poprawne':
                    this.http.nadajAlbum(this.formP.get('numer').value)
                    setTimeout(() => {
                        this.router.navigate(['/menu'], {transition: {name: 'slideTop', duration: 500}})
                    }, 200)
                    break;
            case 'niepoprawne':
                this.ui.pokazPowiadomienie("Uwaga!", "Niepoprawny numer albumu i/lub hasło", 1,2)
                break;
            case 'nieaktywne':
                    this.modal.showModal(AktywacjaModalComponent, {
                        context: this.formP.get('numer').value,
                        viewContainerRef: this.vcRef,
                        fullscreen: false,
                        stretched: false,
                        animated: true,
                        closeCallback: null,
                        dimAmount: 0.7 // Sets the alpha of the background dim,

                    } as ExtendedShowModalOptions).then(callback => {
                        if(callback === "dalej")
                        {
                            this.http.nadajAlbum(this.formP.get('numer').value)
                            setTimeout(() => {
                                this.router.navigate(['/menu'], {transition: {name: 'slideTop', duration: 500}, clearHistory: true})
                            }, 200)
                        }
                        else if(callback === "blad")
                        {
                            this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1,2)
                        }
                    })
                break;
            case 'blad':
                this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1,2)
                break;
            default:
                break;
        }
    })
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

  zapomnialem()
  {
    this.modal.showModal(ZapomnialemModalComponent, {
        context: null,
        viewContainerRef: this.vcRef,
        fullscreen: false,
        stretched: false,
        animated: true,
        closeCallback: null,
        dimAmount: 0.7 // Sets the alpha of the background dim,

    } as ExtendedShowModalOptions).then(res => {
        if(res === 'wyslano')
        {
            this.ui.pokazPowiadomienie('Sukces!', 'Na Twoją pocztę studencką wysłano potwierdzenie', 0, 2)
        }
        else if(res === 'blad')
        {
            this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1,2)
        }

    })
  }


}
