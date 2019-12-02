import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Page } from '@nativescript/core';
import { DaneService } from '../dane.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterExtensions } from 'nativescript-angular/router';
import { UiService } from '../ui.service';
import { HttpService } from '../http.service';
import { ZmienHasloModalComponent } from '../modale/zmien-haslo-modal/zmien-haslo-modal.component';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';

@Component({
  selector: 'ns-user-dane',
  templateUrl: './user-dane.component.html',
  styleUrls: ['./user-dane.component.css'],
  moduleId: module.id,
})
export class UserDaneComponent implements OnInit,OnDestroy {

    klucze: Subscription
    dlugosc_listy: number = 0;
    nr_albumu: number = 0;
    miejsce: number = 0;

    private odliczenie;

  constructor(private page: Page, private dane: DaneService, private router: RouterExtensions,
    private ui: UiService, private http: HttpService, private modal: ModalDialogService,
    private vcRef: ViewContainerRef) { }

  ngOnInit() {
      this.nr_albumu = this.http.NumerAlbumu

      this.page.actionBarHidden = true;


      this.klucze = this.dane.Klucze.subscribe(klucze => {
        clearTimeout(this.odliczenie)
          if(klucze !== null && klucze !== undefined)
          {
              this.dlugosc_listy = klucze.length
              this.odliczenie = setTimeout(async () => {
                  if(this.dlugosc_listy>0)
                  {
                      this.dane.ranking().then(res => {
                          this.miejsce  = res
                      })
                  }
              },200)
            }

      })
  }

  ngOnDestroy(): void {
    this.klucze.unsubscribe()
  }

  zmienHaslo()
  {
    this.modal.showModal(ZmienHasloModalComponent, {
        context: null,
        viewContainerRef: this.vcRef,
        fullscreen: false,
        stretched: false,
        animated: true,
        closeCallback: null,
        dimAmount: 0.7 // Sets the alpha of the background dim,

    } as ExtendedShowModalOptions).then()
  }

  wyloguj()
  {
      this.router.navigate([""],{clearHistory: true, transition: { name: 'slideBottom', duration: 500}})
    setTimeout(() => {
        this.ui.pokazPowiadomienie('Sukces','Wylogowano pomyślnie',0,2)
    }, 300);
  }

}
