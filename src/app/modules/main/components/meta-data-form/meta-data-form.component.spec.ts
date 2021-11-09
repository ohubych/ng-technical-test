import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDataFormComponent } from './meta-data-form.component';

describe('MetaDataFormComponent', () => {
  let component: MetaDataFormComponent;
  let fixture: ComponentFixture<MetaDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
