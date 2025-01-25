import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaryCardComponent } from './sumary-card.component';

describe('SumaryCardComponent', () => {
  let component: SumaryCardComponent;
  let fixture: ComponentFixture<SumaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
