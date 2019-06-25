import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOrdersComponent } from './agent-orders.component';

describe('AgentOrdersComponent', () => {
  let component: AgentOrdersComponent;
  let fixture: ComponentFixture<AgentOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
