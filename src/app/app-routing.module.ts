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

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
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
  {path: 'order-detail/:id', component: OrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
