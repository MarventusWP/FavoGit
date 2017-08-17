import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchUsersComponent } from './components/search-users/search-users.component';

const routes: Routes = [
	{
	path: 'search',
	component: SearchUsersComponent
	},
	{
	path: '',
	redirectTo: 'search',
	pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
