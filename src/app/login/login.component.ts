import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ExtendedShowModalOptions } from 'nativescript-windowed-modal';
import { RejestracjaModalComponent } from '../modale/rejestracja-modal/rejestracja-modal.component';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  constructor(private router: RouterExtensions, private page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef) { }

  avail: boolean = false;

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  zaloguj()
  {
    this.router.navigate(['/menu'], {transition: {name: 'slideTop'}, clearHistory: true})
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
