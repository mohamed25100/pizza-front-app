import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizza } from 'src/app/model/pizza.model';
import { Sandwich } from 'src/app/model/sandwich.model';
import { PizzaService } from 'src/app/services/pizza.service';
import { SandwichService } from 'src/app/services/sandwich.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {
  listPizzas: Pizza[] | undefined;
  listSandwiches: Sandwich[] | undefined;
  constructor(public pizzaService: PizzaService, public sandwichService: SandwichService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPizzas();
    this.getAllSandwiches();
  }


  /**
   * Retrieve all sandwiches from the API and store them in the component's listSandwiches property.
   */
  getAllSandwiches() {
    this.sandwichService.getSandwiches().subscribe((sandwiches: Sandwich[]) => {
      this.listSandwiches = sandwiches;
    });
  }

  getAllPizzas() {
    this.pizzaService.getPizzas().subscribe((pizzas: Pizza[]) => {
      this.listPizzas = pizzas;
    });
  }

  goToPizzaDetail(id: number) {
    this.router.navigate(['/pizzas', id]);
  }

  goToSandwichDetail(id: number) {
    this.router.navigate(['/sandwiches', id]);
  }
}
