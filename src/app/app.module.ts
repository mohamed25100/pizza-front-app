import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MenuListComponent } from './features/menu-list/menu-list.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './features/menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { PanierComponent } from './features/panier/panier.component';
import { NavbarComponent } from './features/Navbar/navbar.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminProduitsListComponent } from './features/admin/admin-produits-list/admin-produits-list.component';
import { AdminProduitFormComponent } from './features/admin/admin-produit-form/admin-produit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    PanierComponent,
    NavbarComponent,
    AdminLayoutComponent,
    AdminProduitsListComponent,
    AdminProduitFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
