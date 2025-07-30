import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConectivityPage } from './conectivity.page';

describe('ConectivityPage', () => {
  let component: ConectivityPage;
  let fixture: ComponentFixture<ConectivityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConectivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
