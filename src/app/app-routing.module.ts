import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PizzaComponent } from './components/pizzas/pizza/pizza.component';
import { SandwichComponent } from './components/pizzas/sandwich/sandwich.component';

const routes: Routes = [
  {
    path: 'pizzas',
    component: PizzasComponent,
  },
  {
    path: 'pizzas/:id',
    component: PizzaComponent
  },
  {
    path: 'sandwiches/:id',
    component: SandwichComponent
  },
  {
    path: '', redirectTo: 'pizzas', pathMatch: 'full'
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
