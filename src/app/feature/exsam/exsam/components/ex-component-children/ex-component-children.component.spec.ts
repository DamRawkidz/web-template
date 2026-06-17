import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExComponentChildrenComponent } from './ex-component-children.component';

describe('ExComponentChildrenComponent', () => {
  let component: ExComponentChildrenComponent;
  let fixture: ComponentFixture<ExComponentChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExComponentChildrenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExComponentChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
