import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'home',
//     component: HomePageComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'details',
//     component: PersonDetailsPageComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'login',
//     component: LoginPageComponent,
//   },
//   {
//     path: 'history',
//     component: HistoryPageComponent,
//   },
//   {
//     path: '**',
//     redirectTo: 'home',
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
