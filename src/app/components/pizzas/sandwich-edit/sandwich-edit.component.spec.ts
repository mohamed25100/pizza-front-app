import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichEditComponent } from './sandwich-edit.component';

describe('SandwichEditComponent', () => {
  let component: SandwichEditComponent;
  let fixture: ComponentFixture<SandwichEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandwichEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
