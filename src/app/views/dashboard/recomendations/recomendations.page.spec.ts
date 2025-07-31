import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendationsPage } from './recomendations.page';

describe('RecomendationsPage', () => {
  let component: RecomendationsPage;
  let fixture: ComponentFixture<RecomendationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
