import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {IngredientListComponent} from './components/ingredients/ingredient-list/ingredient-list.component';
import {HomeComponent} from './components/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {AddIngredientComponent} from './components/ingredients/add-ingredient/add-ingredient.component';
import {EditIngredientComponent} from './components/ingredients/edit-ingredient/edit-ingredient.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TacoListComponent} from './components/Taco/taco-list/taco-list.component';
import {TacoDetailComponent} from './components/Taco/taco-detail/taco-detail.component';
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {AddTacoComponent} from './components/Taco/add-taco/add-taco.component';
import {EditTacoComponent} from './components/Taco/edit-taco/edit-taco.component';
import {OrderWindowComponent} from './components/order/order-window/order-window.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {OrderConfirmedComponent} from './components/order/order-confirmd/order-confirmed.component';
import {CcardValidatorDirective} from './validators/ccard-validator.directive';
import {OrderListComponent} from './components/order/order-list/order-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {OrderDetailComponent} from './components/order/order-detail/order-detail.component';
import {RedirectComponent} from './components/auth/redirect/redirect.component';
import {SessionExpiredComponent} from './components/auth/session-expired/session-expired.component';
import {PreLoginComponent} from './components/auth/pre-login/pre-login.component';
import {httpInterceptorProviders} from "./interceptor/interceptors";
import {ToolbarPrivateComponent} from './parts/toolbar-private/toolbar-private.component';
import {ToolbarPublicComponent} from './parts/toolbar-public/toolbar-public.component';
import {PublicComponent} from './pages/public/public.component';
import {PrivateComponent} from './pages/private/private.component';
import {LoggedOutComponent} from './components/auth/logged-out/logged-out.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { OrdererDetailComponent } from './parts/orderer-detail/orderer-detail.component';

// import { NgXCreditCardsModule } from 'ngx-credit-cards';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    HomeComponent,
    AddIngredientComponent,
    EditIngredientComponent,
    TacoListComponent,
    TacoDetailComponent,
    AddTacoComponent,
    EditTacoComponent,
    OrderWindowComponent,
    OrderConfirmedComponent,
    CcardValidatorDirective,
    OrderListComponent,
    OrderDetailComponent,
    RedirectComponent,
    SessionExpiredComponent,
    PreLoginComponent,
    ToolbarPrivateComponent,
    ToolbarPublicComponent,
    PublicComponent,
    PrivateComponent,
    LoggedOutComponent,
    OrdererDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatChipsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
