import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as sha512 from 'js-sha512';
import { Klucz } from './modele/klucz.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private nr_albumu: number = null;

  private serverUrl = "http://192.168.1.2:3003"

  nadajAlbum(nr_albumu: number)
  {
      this.nr_albumu = nr_albumu;
  }

  get NumerAlbumu()
  {
      return this.nr_albumu
  }

  //TWORZENIE NOWEGO USERA
  async rejestracja(numer_albumu: number, haslo: string)
  {
    return new Promise<number>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
        });

        this.http.post(this.serverUrl + '/register', {numer_albumu: numer_albumu, haslo: sha512.sha512.hmac('IT', haslo)}, {headers: options}).subscribe(res => {
            if (res.hasOwnProperty('insertId')) {
                resolve(1);
            }
            else if (res.hasOwnProperty('code')) {
                let code = JSON.parse(JSON.stringify(res));
                if (code.code === 'ER_DUP_ENTRY') {
                    resolve(2);
                }
                else
                {
                    resolve(0)
                }
            }
            else if(res === 'istnieje')
            {
                resolve(2)
            }
            else {
                resolve(0);
            }
        });
    })
  }

  //LOGOWANIE
  async logowanie(nr_albumu_user: string, haslo: string) {
    return new Promise<string>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
            "data": encodeURI(JSON.stringify({ nr_albumu_user: nr_albumu_user, haslo: sha512.sha512.hmac('IT', haslo) }))
        });

        this.http.get(this.serverUrl + '/login', { headers: options }).subscribe(res => {
            if(res === 'nieaktywne')
            {
                resolve('nieaktywne')
            }
            else if(res === 'poprawne')
            {
                resolve('poprawne')
            }
            else if(res === 'brak')
            {
                resolve('brak')
            }
            else if(res === 'niepoprawne')
            {
                resolve('niepoprawne')
            }
            else
            {
                resolve('blad')
            }
        });
    });
}

//AKTYWACJA USERA
async aktywacja(nr_albumu_user: string, kod_aktywacji: string) {
    return new Promise<string>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
            "data": encodeURI(JSON.stringify({ nr_albumu_user: nr_albumu_user, kod_aktywacji: kod_aktywacji }))
        });

        this.http.get(this.serverUrl + '/activate', { headers: options }).subscribe(res => {
            if(res === 'nieistnieje')
            {
                resolve('blad')
            }
            else if(res === 'niepoprawny')
            {
                resolve('niepoprawny')
            }
            else if(res === 'niemakodu')
            {
                resolve('blad')
            }
            else if(res === 'wygaslo')
            {
                resolve('wygaslo')
            }
            else if(res === 'aktywowany')
            {
                resolve('aktywowany')
            }
            else
            {
                resolve('blad')
            }
        });
    });
}

//ZAPOMNIAŁEM HASŁA
async zapomnialem(nr_albumu_user: string) {
    return new Promise<string>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
            "data": encodeURI(JSON.stringify({ nr_albumu_user: nr_albumu_user}))
        });

        this.http.get(this.serverUrl + '/remind', { headers: options }).subscribe(res => {
            if(res === 'wyslano')
            {
                resolve('wyslano')
            }
            else if(res === 'nieaktywne')
            {
                resolve('nieaktywne')
            }
            else if(res === 'brak')
            {
                resolve('brak')
            }
            else
            {
                resolve('blad')
            }
        });
    });
}

//DODAWANIE KLUCZA
async zbierzKlucz(RFID: string)
  {
    return new Promise<number>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json"
        });

        this.http.post(this.serverUrl + '/get_key', {numer_albumu: this.nr_albumu, RFID: RFID}, {headers: options}).subscribe(res => {
            if (res.hasOwnProperty('insertId')) {
                resolve(1);
            }
            else if(res === 'brak')
            {
                resolve(3)
            }
            else if(res === 'istnieje')
            {
                resolve(2)
            }
            else {
                resolve(0);
            }
        });
    })
  }

  //POBIERANIE LISTY KLUCZY
  async pobierzKlucze()
  {
    return new Promise<Array<Klucz>>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
            "data": encodeURI(JSON.stringify({nr_albumu_user: this.nr_albumu}))
        });

        this.http.get(this.serverUrl + '/fetch_keys', {headers: options}).subscribe(res => {
            resolve(JSON.parse(decodeURI(JSON.stringify(res))))
        });
    })
  }

  //DLUGOSC LISTY KLUCZY
  async dlugoscListyKluczy()
  {
    return new Promise<number>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json"
        });

        this.http.get(this.serverUrl + '/lenght', {headers: options}).subscribe(res => {
            if(res === null)
            {
                resolve(0)
                return
            }
            if(res.hasOwnProperty('dlugosc'))
            {
                resolve(JSON.parse(JSON.stringify(res)).dlugosc)
            }
            else
            {
                resolve(0)
            }
        });
    })
  }

  //RANKING
  async ranking()
  {
    return new Promise<number>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json",
            "data": encodeURI(JSON.stringify({nr_albumu: this.nr_albumu}))
        });

        this.http.get(this.serverUrl + '/rank', {headers: options}).subscribe(res => {
            if(res === null)
            {
                resolve(0)
                return
            }
            if(res.hasOwnProperty('rnk'))
            {
                resolve(JSON.parse(JSON.stringify(res)).rnk)
            }
            else
            {
                resolve(0)
            }
        });
    })
  }

  //ZMIANA HASLA
  async zmienHaslo(aktualne_haslo: string, nowe_haslo: string) {
    return new Promise<number>(resolve => {
        let options = new HttpHeaders({
            "Content-Type": "application/json"
        });

        this.http.post(this.serverUrl + '/change_password' , { aktualne_haslo: sha512.sha512.hmac('IT', aktualne_haslo), nowe_haslo: sha512.sha512.hmac('IT', nowe_haslo), nr_albumu: this.nr_albumu}, { headers: options }).subscribe(res => {
            if (res === 'zakonczono') {
                resolve(1);
            }
            else if(res === 'niepoprawne')
            {
                resolve(2);
            }
            else {
                resolve(0);
            }
        });
    });
}

}




