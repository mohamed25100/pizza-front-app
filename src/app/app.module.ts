import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SandwichComponent } from './components/pizzas/sandwich/sandwich.component';
import { PizzaComponent } from './components/pizzas/pizza/pizza.component';
import { PizzaEditComponent } from './components/pizzas/pizza-edit/pizza-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PizzasComponent,
    NotFoundComponent,
    PizzaComponent,
    SandwichComponent,
    PizzaEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
