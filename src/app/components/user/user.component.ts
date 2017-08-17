import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from '../../models/models';

@Component({
	selector: '[data-user]',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	constructor() { }
	

	@Input() user: UserModel;
	@Input() odd: boolean;
	@Output() userSelected = new EventEmitter<any>();

	selectUser(user){
		user.isFavorite = !user.isFavorite;
		this.userSelected.emit();
	}

	ngOnInit() {
	}

}
