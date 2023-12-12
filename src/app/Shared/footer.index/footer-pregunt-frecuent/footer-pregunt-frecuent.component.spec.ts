import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPreguntFrecuentComponent } from './footer-pregunt-frecuent.component';

describe('FooterPreguntFrecuentComponent', () => {
  let component: FooterPreguntFrecuentComponent;
  let fixture: ComponentFixture<FooterPreguntFrecuentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterPreguntFrecuentComponent]
    });
    fixture = TestBed.createComponent(FooterPreguntFrecuentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
