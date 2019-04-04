import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LessonEffects } from './lesson.effects';

describe('LessonEffects', () => {
  let actions$: Observable<any>;
  let effects: LessonEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LessonEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LessonEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
