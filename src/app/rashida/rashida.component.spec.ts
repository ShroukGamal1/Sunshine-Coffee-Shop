import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RashidaComponent } from './rashida.component';

describe('RashidaComponent', () => {
  let component: RashidaComponent;
  let fixture: ComponentFixture<RashidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RashidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RashidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
