import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core';
import { Scan } from '../modele/scan.model';
import { NfcService } from '../nfc.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    moduleId: module.id,
})
export class MenuComponent implements OnInit {

    scan: Scan
    message: string = "";

    constructor(private page: Page, private nfcService: NfcService, private active: ActivatedRoute, private router: RouterExtensions) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.router.navigate([{ outlets: { klucze: ['klucze'], user: ['user-dane']} }],{relativeTo: this.active});
    }
}
