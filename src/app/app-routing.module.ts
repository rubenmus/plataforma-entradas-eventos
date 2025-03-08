import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadComponent: ()=> import('./events/pages/events/events.component').then( m=>m.EventsComponent)
  },
  {
    path: 'sessions/:id',
    loadComponent: ()=> import('./events/pages/sessions/sessions.component').then( m=>m.SessionsComponent)
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
