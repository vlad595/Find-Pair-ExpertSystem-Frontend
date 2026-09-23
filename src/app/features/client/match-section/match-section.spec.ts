import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchSection } from './match-section';

describe('MatchSection', () => {
  let component: MatchSection;
  let fixture: ComponentFixture<MatchSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchSection],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
