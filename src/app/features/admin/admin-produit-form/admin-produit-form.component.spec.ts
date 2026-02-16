import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProduitFormComponent } from './admin-produit-form.component';

describe('AdminProduitFormComponent', () => {
  let component: AdminProduitFormComponent;
  let fixture: ComponentFixture<AdminProduitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProduitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProduitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
