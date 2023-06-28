import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvireRegisterComponent } from './invire-register.component';

describe('InvireRegisterComponent', () => {
  let component: InvireRegisterComponent;
  let fixture: ComponentFixture<InvireRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvireRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvireRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
