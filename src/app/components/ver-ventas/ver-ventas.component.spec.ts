import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVentasComponent } from './ver-ventas.component';

describe('VerVentasComponent', () => {
  let component: VerVentasComponent;
  let fixture: ComponentFixture<VerVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
