import { TestBed } from '@angular/core/testing';

import { RecipesLoadedGuard } from './recipes-loaded.guard';

describe('RecipesLoadedGuard', () => {
  let guard: RecipesLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecipesLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
