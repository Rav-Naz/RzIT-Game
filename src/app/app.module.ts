import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RejestracjaModalComponent } from './modale/rejestracja-modal/rejestracja-modal.component';
import { CheckboxZwyklyComponent } from "./shared/checkbox-zwykly/checkbox-zwykly.component";
import { KluczeComponent } from './klucze/klucze.component';
import { UserDaneComponent } from './user-dane/user-dane.component';
import { SzczegolyKluczaComponent } from './szczegoly-klucza/szczegoly-klucza.component';
import { SkanowanieComponent } from './modale/skanowanie/skanowanie.component';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AktywacjaModalComponent } from './modale/aktywacja-modal/aktywacja-modal.component';
import { ZapomnialemModalComponent } from './modale/zapomnialem-modal/zapomnialem-modal.component';
import { GodzinaPipe } from './godzina.pipe';
import { ZmienHasloModalComponent } from './modale/zmien-haslo-modal/zmien-haslo-modal.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MenuComponent,
        RejestracjaModalComponent,
        CheckboxZwyklyComponent,
        KluczeComponent,
        UserDaneComponent,
        SzczegolyKluczaComponent,
        SkanowanieComponent,
        AktywacjaModalComponent,
        ZapomnialemModalComponent,
        GodzinaPipe,
        ZmienHasloModalComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [RejestracjaModalComponent, SkanowanieComponent, AktywacjaModalComponent, ZapomnialemModalComponent, ZmienHasloModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
