import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceiroListComponent } from './financeiro-list.component';

describe('FinanceiroListComponent', () => {
  let component: FinanceiroListComponent;
  let fixture: ComponentFixture<FinanceiroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceiroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceiroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
