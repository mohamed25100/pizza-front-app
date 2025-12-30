import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sandwich } from 'src/app/model/sandwich.model';
import { SandwichService } from 'src/app/services/sandwich.service';

@Component({
  selector: 'app-sandwich-edit',
  templateUrl: './sandwich-edit.component.html',
  styleUrls: ['./sandwich-edit.component.css']
})
export class SandwichEditComponent implements OnInit {

  sandwichId!: number;
  sandwich: Sandwich = new Sandwich(0, '', 0);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sandwichService: SandwichService
  ) {}

  ngOnInit(): void {
    this.sandwichId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSandwich();
  }

  loadSandwich() {
    this.sandwichService.getSandwichById(this.sandwichId).subscribe({
      next: (sandwich: Sandwich) => {
        this.sandwich = sandwich;
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  updateSandwich() {
    this.sandwichService.updateSandwich(this.sandwichId, this.sandwich).subscribe({
      next: () => this.router.navigate(['/sandwiches']),
      error: err => console.error("Erreur mise à jour :", err)
    });
  }

  cancel() {
    this.router.navigate(['/sandwiches']);
  }

}
