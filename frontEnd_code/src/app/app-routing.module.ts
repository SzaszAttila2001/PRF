import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { ItemComponent } from './items/item/item.component';
import { NewItemComponent } from './items/new-item/new-item.component';
import { RegisterComponent } from './register/register.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UsersupdateComponent } from './users/usersupdate/usersupdate.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserslistComponent, canActivate: [AdminGuard]},
  {path: 'item/:id', component: ItemComponent, canActivate: [AuthGuard]},
  {path: 'uupdate/:id', component: UsersupdateComponent, canActivate: [AdminGuard]},
  {path: 'newitem', component: NewItemComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
