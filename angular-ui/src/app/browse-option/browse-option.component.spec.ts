import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseOptionComponent } from './browse-option.component';

describe('BrowseOptionComponent', () => {
  let component: BrowseOptionComponent;
  let fixture: ComponentFixture<BrowseOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseOptionComponent]
    });
    fixture = TestBed.createComponent(BrowseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
