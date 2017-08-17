import { Component, OnInit, Input } from '@angular/core';

import { AppSettingsService } from '../../services/app-settings/app-settings.service';
import { UserModel, SortSearchModel } from '../../models/models';

@Component({
	selector: '[data-user-list]',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
})


export class UserListComponent implements OnInit {

	constructor(
		private settingsService: AppSettingsService
	){}

	private _userList:Array<UserModel>;
	
	@Input() showResults: boolean;

	@Input()
	set totalResults(total: number) {
		this._totalResults = total;
		this.totalCount = total;
	}
	get totalResults(): number { return this._totalResults; };

	@Input()
	set userList(list: Array<UserModel>) {
		console.log("set list");
		this._userList = list;
		this.allUsers = list;
		this.filterSelected();
		this.sortMode = 'all';
		this.maxCount = this.settingsService.maxCount;
	  }
	get userList(): Array<UserModel> { return this._userList; };

	private sortOptions: Array<SortSearchModel>;
	private sortOptionSelected: string = "";
	private sortOrder: string = "asc";
	private sortMode: string = "all";
	private _totalResults: number;
	private totalCount: number;
	private maxCount: number = this.settingsService.maxCount;
	private allUsers: Array<UserModel>;
	private favUsers: Array<UserModel> = new Array();

	genSortOptions(){
		let options: Array<string> = [
				"login", "type", "id", "score"
			],
			defaultVal = {
				nicename: 'Sort By:',
				value: '',
				default: true
			};
		this.sortOptions = new Array(defaultVal);
		
		for( let option of options ){
			this.sortOptions.push({
				nicename: option.substr(0,1).toUpperCase() + option.substr(1, option.length -1),
				value: option,
				default: false
			});
		}
	}

	applySortMode(sortMode: string):void{
		this.sortMode = sortMode;
		this.maxCount = sortMode === 'all' ? this.settingsService.maxCount : this.favUsers.length;
		this.totalCount = sortMode === 'all' ? this._totalResults : this.settingsService.maxCount;
	}

	applySortOrder(sortOrder: string = 'asc'):void {
		this.sortOrder = sortOrder;
		let sortList = this.sortMode === 'all' ? this._userList : this.favUsers;
		sortList.sort((a, b) => {
			if( sortOrder === 'asc') {
				return a.score < b.score ? 1 : (a.score > b.score ? -1 : 0);
			}
			else {
				return a.score > b.score ? 1 : (a.score < b.score ? -1 : 0);
			}
		});
	}

	filterSelected(){
		this.favUsers = this._userList.slice(0).filter(user => user.isFavorite);
	}

	ngOnInit() {
		this.genSortOptions();
	}

}
