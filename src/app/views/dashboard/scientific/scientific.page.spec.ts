import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScientificPage } from './scientific.page';

describe('ScientificPage', () => {
  let component: ScientificPage;
  let fixture: ComponentFixture<ScientificPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
