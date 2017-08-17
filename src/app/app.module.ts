import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { UserListComponent } from './components/user-list/user-list.component';

import {HttpModule } from '@angular/http';
import { UserService } from './services/users/user.service';
import { AppSettingsService } from './services/app-settings/app-settings.service';
import { ThousandsPipe } from './pipes/thousands.pipe';
import { UserComponent } from './components/user/user.component';

@NgModule({
	declarations: [
	AppComponent,
	HeaderComponent,
	SearchUsersComponent,
	UserListComponent,
	ThousandsPipe,
	UserComponent
	],
	imports: [
	BrowserModule,
	AppRoutingModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule
	],
	providers: [
		AppSettingsService,
		UserService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
