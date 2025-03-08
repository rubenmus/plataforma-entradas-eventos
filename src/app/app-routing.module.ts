import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: ()=> import('./heroes/heroes/pages/hero/hero.component').then( m=>m.HeroComponent)
  },
  {
    path: 'new',
    loadComponent: ()=> import('./heroes/heroes/pages/new-hero/new-hero.component').then( m=>m.NewHeroComponent)
  },
  {
    path: 'heroes/:id/edit',
    loadComponent: ()=> import('./heroes/heroes/pages/edit-hero/edit-hero.component').then( m=>m.EditHeroComponent)
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'heroes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
