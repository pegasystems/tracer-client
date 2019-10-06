import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarRightComponent } from './status-bar-right.component';

describe('StatusBarRightComponent', () => {
  let component: StatusBarRightComponent;
  let fixture: ComponentFixture<StatusBarRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusBarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
