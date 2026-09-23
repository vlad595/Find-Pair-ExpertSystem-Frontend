import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatesSection } from './candidates-section';

describe('CandidatesSection', () => {
  let component: CandidatesSection;
  let fixture: ComponentFixture<CandidatesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CandidatesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
