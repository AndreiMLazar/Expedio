import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommandsComponent } from './all-commands.component';

describe('AllCommandsComponent', () => {
  let component: AllCommandsComponent;
  let fixture: ComponentFixture<AllCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCommandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
