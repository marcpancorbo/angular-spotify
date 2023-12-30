import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresFilterComponent } from './genres-filter.component';

describe('GenresFilterComponent', () => {
  let component: GenresFilterComponent;
  let fixture: ComponentFixture<GenresFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenresFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
