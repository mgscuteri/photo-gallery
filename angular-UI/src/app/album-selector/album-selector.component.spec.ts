import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSelectorComponent } from './album-selector.component';

describe('AlbumSelectorComponent', () => {
  let component: AlbumSelectorComponent;
  let fixture: ComponentFixture<AlbumSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
