import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { environment } from "../../../environments/environment";
import { UserModel } from '../../models/models';

@Injectable()
export class UserService {
	private jsonHeader = new Headers({
		'Content-Type': 'application/json'
	});

	public currentPage: number = 1;
	public usersAmount: number;

	constructor(private http: Http) { }

	getUsers(query?: string ): Observable<UserModel[]> {
		let url: string = environment.api;
		url += typeof query !== "undefined" ? '?q=' + query : '';
		return this.http
			.get(url, {headers: this.jsonHeader} )
			.map(response => {
				let json = response.json();
				return json;
			})
			.catch(this.handleError);
	}
		
	private handleError(error: any): Observable<any> {
		console.error('An error occurred', error);
		return Observable.throw(error.message || error);
	}

}