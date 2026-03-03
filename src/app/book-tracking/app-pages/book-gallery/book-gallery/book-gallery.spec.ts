import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookGallery } from './book-gallery';

describe('BookGallery', () => {
  let component: BookGallery;
  let fixture: ComponentFixture<BookGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(BookGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
