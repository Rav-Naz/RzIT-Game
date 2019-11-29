import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { DaneService } from '../dane.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Klucz } from '../modele/klucz.model';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';
import { Label } from 'tns-core-modules/ui/label/label';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';
import { SkanowanieComponent } from '../modale/skanowanie/skanowanie.component';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../ui.service';

@Component({
  selector: 'ns-klucze',
  templateUrl: './klucze.component.html',
  styleUrls: ['./klucze.component.css'],
  moduleId: module.id,
})
export class KluczeComponent implements OnInit {

    klucze: Subscription
    listaKluczy: Array<Klucz> = [];


    @ViewChild("postepcont", { static: false }) postepContRef: ElementRef<FlexboxLayout>;
    @ViewChild("postep", { static: false }) postepRef: ElementRef<Label>;

  constructor(private page: Page, private dane: DaneService, private modal: ModalDialogService, private vcRef: ViewContainerRef,
    private router: RouterExtensions, private active: ActivatedRoute, private ui: UiService) { }

  ngOnInit() {
      this.page.actionBarHidden = true;
      this.klucze = this.dane.Klucze.subscribe(klucze => {
          this.listaKluczy = klucze
          if(this.listaKluczy !== null)
          {
              setTimeout(() => {
                  this.obliczPostep()
              }, 200)
          }
      })
      this.dane.pobierzKlucze()
    }

    obliczPostep()
    {
        this.postepRef.nativeElement.width = {unit: "%", value: (1/7)*this.listaKluczy.length}
    }

    skanuj()
    {
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
            else
            {
                this.ui.pokazPowiadomienie('Sukces!', result, 0,2)
            }
        })

    }

    szczegoly(klucz: Klucz)
    {
        this.dane.nadajKlucz(klucz)
        this.router.navigate(['../szczegoly-klucza'], {transition: {name: 'slideRight', duration: 500}, relativeTo: this.active})
    }

}
