import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { KluczeComponent } from "./klucze/klucze.component";
import { SzczegolyKluczaComponent } from "./szczegoly-klucza/szczegoly-klucza.component";
import { UserDaneComponent } from "./user-dane/user-dane.component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "menu", component: MenuComponent, children: [
        { path: "klucze", component: KluczeComponent , outlet: 'klucze'},
        { path: "szczegoly-klucza", component: SzczegolyKluczaComponent , outlet: 'klucze'},
        { path: "user-dane", component: UserDaneComponent , outlet: 'user'},
    ]},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
