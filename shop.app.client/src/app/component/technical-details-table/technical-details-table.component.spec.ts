import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDetailsTableComponent } from './technical-details-table.component';

describe('TechnicalDetailsTableComponent', () => {
  let component: TechnicalDetailsTableComponent;
  let fixture: ComponentFixture<TechnicalDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicalDetailsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicalDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
