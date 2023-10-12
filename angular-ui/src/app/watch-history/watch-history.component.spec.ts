import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchHistoryComponent } from './watch-history.component';

describe('WatchHistoryComponent', () => {
  let component: WatchHistoryComponent;
  let fixture: ComponentFixture<WatchHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchHistoryComponent]
    });
    fixture = TestBed.createComponent(WatchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
