import { Injectable } from '@angular/core';
import { Klucz } from './modele/klucz.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaneService {

    private wybranyKlucz: Klucz;


    private klucze: Array<Klucz> = [
        {id: 1, rfid: 123456, tytul: 'Przy parkingu', zagadka: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', link: 'https://www.google.pl/maps/@50.0217305,21.9915194,15.46z', data_zebrania: '06.12.2019 16:14'},
        {id: 2, rfid: 123456, tytul: 'Pod ławką', zagadka: 'Jakas tam tresc', link: 'https://www.google.pl/maps/place/35-001+Rzesz%C3%B3w/@50.0199214,21.9835325,311m/data=!3m1!1e3!4m5!3m4!1s0x473cfbb3ef9200e7:0xe5e40593fed8ddc2!8m2!3d50.0198774!4d21.9844536', data_zebrania: '06.12.2019 11:13'},
        {id: 3, rfid: 123456, tytul: 'Obok sklepiku', zagadka: 'Jakas tam tresc', link: 'https://www.google.pl/maps/place/35-001+Rzesz%C3%B3w/@50.0199214,21.9835325,311m/data=!3m1!1e3!4m5!3m4!1s0x473cfbb3ef9200e7:0xe5e40593fed8ddc2!8m2!3d50.0198774!4d21.9844536', data_zebrania: '06.12.2019 11:17'},
        {id: 4, rfid: 123456, tytul: 'Na dachu', zagadka: 'Jakas tam tresc', link: 'https://www.google.pl/maps/dir//Rzesz%C3%B3w,+35-001/@50.0197041,21.9534414,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x473cfbb36d5a8e05:0xb7aa9059f445127a!2m2!1d21.9884607!2d50.0196542', data_zebrania: '06.12.2019 17:14'},
        {id: 5, rfid: 123456, tytul: 'Pod schodami', zagadka: 'Jakas tam tresc', link: 'https://www.google.pl/maps/dir//Rzesz%C3%B3w,+35-001/@50.0197041,21.9534414,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x473cfbb36d5a8e05:0xb7aa9059f445127a!2m2!1d21.9884607!2d50.0196542', data_zebrania: '06.12.2019 13:44'},
        {id: 6, rfid: 123456, tytul: 'Na tablicy', zagadka: 'Jakas tam tresc', link: 'https://www.google.pl/maps/place/35-001+Rzesz%C3%B3w/@50.019685,21.9836297,18.25z/data=!4m5!3m4!1s0x473cfbb3f06e96d9:0x7568651bf5f44ead!8m2!3d50.0196906!4d21.9843224', data_zebrania: '06.12.2019 10:03'}
    ]

    private kluczeSub = new BehaviorSubject<Array<Klucz>>(null);


    get Klucze()
    {
        return this.kluczeSub.asObservable()
    }

    pobierzKlucze()
    {
        this.kluczeSub.next(this.klucze)
    }

   nadajKlucz(klucz: Klucz)
    {
        this.wybranyKlucz = klucz;
    }

    get WybranyKlucz()
    {
        return this.wybranyKlucz
    }
}
