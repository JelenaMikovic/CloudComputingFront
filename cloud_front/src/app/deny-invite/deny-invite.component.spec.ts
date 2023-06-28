import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyInviteComponent } from './deny-invite.component';

describe('DenyInviteComponent', () => {
  let component: DenyInviteComponent;
  let fixture: ComponentFixture<DenyInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenyInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
