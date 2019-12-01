import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { DaneService } from '../dane.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Klucz } from '../modele/klucz.model';
import { Label } from 'tns-core-modules/ui/label/label';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';
import { SkanowanieComponent } from '../modale/skanowanie/skanowanie.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../ui.service';
import * as permissions from '../../../node_modules/nativescript-permissions'

@Component({
  selector: 'ns-klucze',
  templateUrl: './klucze.component.html',
  styleUrls: ['./klucze.component.css'],
  moduleId: module.id,
})
export class KluczeComponent implements OnInit {

    klucze: Subscription
    listaKluczy: Array<Klucz> = [];
    dlugoscCalejListy: number = 0;


    @ViewChild("postep", { static: false }) postepRef: ElementRef<Label>;

  constructor(private page: Page, private dane: DaneService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
    private router: RouterExtensions, private active: ActivatedRoute, private ui: UiService) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
      this.klucze = this.dane.Klucze.subscribe(klucze => {

          if(klucze !== null)
          {
            this.listaKluczy = klucze
            this.dane.dlugoscListyKluczy().then(res => {
                this.dlugoscCalejListy = res
                setTimeout(() => {
                    this.obliczPostep()
                }, 200)
            })
          }
      })
      this.dane.pobierzKlucze()
    }

    obliczPostep()
    {
        this.postepRef.nativeElement.width = {unit: "%", value: ( 1 / this.dane.DlugoscCalejListy ) * this.listaKluczy.length}
    }

    skanuj()
    {
        if(!permissions.hasPermission(android.Manifest.permission.NFC))
        {
            permissions.requestPermission(android.Manifest.permission.NFC,"Moduł NFC jest niezbędny do zabawy!").then(res => {
            return
            })
        }
        this.modal.showModal(SkanowanieComponent, {
            context: null,
            viewContainerRef: this.vcRef,
            fullscreen: false,
            stretched: false,
            animated: true,
            closeCallback: null,
            dimAmount: 0.7 // Sets the alpha of the background dim,

        } as ExtendedShowModalOptions).then(result => {
            if(result === 'nfc')
            {
                this.ui.pokazPowiadomienie('Uwaga!', 'Włącz moduł NFC', 2,2)
            }
            else if(result !== undefined)
            {
                this.dane.zbierzKlucz(result).then(res => {
                    if(res === 1)
                    {
                        this.ui.pokazPowiadomienie('Sukces!', 'Znalazłeś nowy klucz', 0,2)
                    }
                    else if(res === 2)
                    {
                        this.ui.pokazPowiadomienie('Uwaga!', 'Już posiadasz ten klucz', 2,2)
                    }
                    else if(res === 3)
                    {
                        this.ui.pokazPowiadomienie('Uwaga!', 'Tego klucza nie ma w naszej bazie', 2,2)
                    }
                    else
                    {
                        this.ui.pokazPowiadomienie("Błąd!", "Wystąpił nieoczekiwany błąd", 1, 2)
                    }
                })
            }
        })

    }

    szczegoly(klucz: Klucz)
    {
        this.dane.nadajKlucz(klucz)
        this.router.navigate(['../szczegoly-klucza'], {transition: {name: 'slideRight', duration: 500}, relativeTo: this.active})
    }

}
