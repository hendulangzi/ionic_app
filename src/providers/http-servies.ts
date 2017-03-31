/**
 * Created by Administrator on 2017/3/12 0012.
 */
import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../app/config';
import 'rxjs/add/operator/toPromise';
import { formEncode } from './utils';

/*
 Generated class for the SignIn page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Injectable()
export class HttpServies {
    constructor(
        private http: Http
    ){
    }
    private apiUrl(svrName){
        return `${API_URL}?service=${svrName}&`;
    }
    httpPost(url:string,body:any){
        var headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl(url),body,options)
                .toPromise()
                .then(res => res.json())
                .catch(error=>{
                    Observable.throw(error.json().error || 'Server Error');
                });
    }
    httpGet(url:string,body:any){
        let headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        let opts = new RequestOptions({headers: headers});
        return this.http.get(this.apiUrl(url) + formEncode(body), opts)
            .toPromise()
            .then(res => res.json())
            .catch(error => {
                Observable.throw(error.json().error || 'Server Error');
            });
    }
}