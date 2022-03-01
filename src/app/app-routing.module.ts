import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResturantDashComponent } from './resturant-dash/resturant-dash.component';
import { SginUpComponent } from './sgin-up/sgin-up.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch :'full' },
  { path:'resturant', component:ResturantDashComponent, pathMatch:'full'},
  { path:'login', component:LoginComponent, pathMatch:'full'},
  { path:'sginUp', component:SginUpComponent, pathMatch:'full'},
  {path:'lazy', loadChildren: ()=> import('./lazy/lazy.module').then(a=>a.LazyModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
