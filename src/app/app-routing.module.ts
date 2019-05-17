import { LoginComponent } from './login/login.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { LinkListComponent } from './link-list/link-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component:LinkListComponent},
  {path:'create', component:CreateLinkComponent},
  {path:'login', component:LoginComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
