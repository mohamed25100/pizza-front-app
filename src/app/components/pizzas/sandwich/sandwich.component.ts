import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sandwich } from 'src/app/model/sandwich.model';
import { SandwichService } from 'src/app/services/sandwich.service';

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css']
})
export class SandwichComponent implements OnInit {

  sandwichId!: number;
  sandwich!: Sandwich | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sandwichService: SandwichService
  ) { }

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    this.sandwichId = Number(this.route.snapshot.paramMap.get('id'));
    this.getSandwichDetail(this.sandwichId);
  }

  /**
   * Récupère un sandwich depuis l’API
   */
  getSandwichDetail(id: number) {
    this.sandwichService.getSandwichById(id).subscribe({
      next: (sandwich: Sandwich) => {
        this.sandwich = sandwich;
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pizzas']);
  }

}
