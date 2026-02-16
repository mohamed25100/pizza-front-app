import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProduitsListComponent } from './admin-produits-list.component';

describe('AdminProduitsListComponent', () => {
  let component: AdminProduitsListComponent;
  let fixture: ComponentFixture<AdminProduitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProduitsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProduitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
