import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsByCategoryPage } from './recommendations-by-category.page';

describe('RecommendationsByCategoryPage', () => {
  let component: RecommendationsByCategoryPage;
  let fixture: ComponentFixture<RecommendationsByCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsByCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
