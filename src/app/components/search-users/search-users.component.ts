import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgSelectOption } from '@angular/forms';

import { AppSettingsService } from '../../services/app-settings/app-settings.service';
import { UserService } from '../../services/users/user.service';
import { UserModel } from '../../models/models';

@Component({
	selector: '[data-search-users]',
	templateUrl: './search-users.component.html',
	styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private settingsService: AppSettingsService
	) {
		this.createSearchForm();
	}

	placeholderText: string = "Search for GitHub users...";

	private users: UserModel[] = new Array();
	totalResults: number = 0;
	private isSearching: boolean = false;

	private userSearchForm: FormGroup;

	getUsers(): void {
		if( !this.userSearchForm.valid ) return;
		this.isSearching = true;
		this.userService.getUsers(this.userSearchForm.value.searchInput).subscribe(
			(response: any) => {
				this.users = response.items.slice(0, this.settingsService.maxCount).map(user => {
					user.isFavorite = false;
					return user;
				});
				this.totalResults = response.total_count;
				console.log(this.users);
				this.isSearching = false;
			}
		);
	}
	
	createSearchForm(): void {
		this.userSearchForm = this.formBuilder.group({
			searchInput: [
				'',
				Validators.compose([Validators.required, Validators.minLength(3)])
			]
		});
	}

	clearSearch(event): void {
		console.log("clear");
		event.preventDefault();
		event.stopPropagation();
		this.users = new Array();
		this.userSearchForm.reset();
	}

	ngOnInit() {
		this.getUsers();
	}

}
