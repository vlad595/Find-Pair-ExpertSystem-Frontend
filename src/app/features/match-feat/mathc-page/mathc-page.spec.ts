import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathcPage } from './mathc-page';

describe('MathcPage', () => {
  let component: MathcPage;
  let fixture: ComponentFixture<MathcPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathcPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MathcPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
