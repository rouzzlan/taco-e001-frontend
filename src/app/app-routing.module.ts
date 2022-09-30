import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngredientListComponent} from "./components/ingredients/ingredient-list/ingredient-list.component";
import {HomeComponent} from "./components/home/home.component";
import {AddIngredientComponent} from "./components/ingredients/add-ingredient/add-ingredient.component";
import {EditIngredientComponent} from "./components/ingredients/edit-ingredient/edit-ingredient.component";
import {TacoListComponent} from "./components/Taco/taco-list/taco-list.component";
import {TacoDetailComponent} from "./components/Taco/taco-detail/taco-detail.component";
import {AddTacoComponent} from "./components/Taco/add-taco/add-taco.component";
import {EditTacoComponent} from "./components/Taco/edit-taco/edit-taco.component";
import {OrderWindowComponent} from "./components/order/order-window/order-window.component";
import {OrderListComponent} from "./components/order/order-list/order-list.component";
import {OrderDetailComponent} from "./components/order/order-detail/order-detail.component";
import {PreLoginComponent} from "./components/auth/pre-login/pre-login.component";
import {RedirectComponent} from "./components/auth/redirect/redirect.component";
import {PublicComponent} from "./pages/public/public.component";
import {SessionExpiredComponent} from "./components/auth/session-expired/session-expired.component";
import {LoggedOutComponent} from "./components/auth/logged-out/logged-out.component";
import {PrivateComponent} from "./pages/private/private.component";

const routes: Routes = [
  {path: '', redirectTo: 'public/welcome', pathMatch: 'full'},
  {path: 'public', component: PublicComponent, children: [
      {path: 'welcome', component: PreLoginComponent},
      {path: 'session-expired', component: SessionExpiredComponent},
      {path: 'logged-out', component: LoggedOutComponent}
    ]},
  {path: 'private', component: PrivateComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'ingredient-list', component: IngredientListComponent},
      {path: 'add-ingredient', component: AddIngredientComponent},
      {path: 'edit-ingredient/:id', component: EditIngredientComponent},
      {path: 'taco-list', component: TacoListComponent},
      {path: 'taco-detail/:id', component: TacoDetailComponent},
      {path: 'add-taco', component: AddTacoComponent},
      {path: 'edit-taco/:id', component: EditTacoComponent},
      {path: 'order', component: OrderWindowComponent},
      {path: 'orders', component: OrderListComponent},
      {path: 'order-detail/:id', component: OrderDetailComponent},
    ]},
  {path: 'login-redirect', component: RedirectComponent},
  {path: 'logout-redirect', component: RedirectComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
