import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as sha512 from 'js-sha512';

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
}
