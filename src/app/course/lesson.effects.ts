import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoursesService } from '../services/courses.service';
import { AppState } from './reducers';
import { Store, select } from '@ngrx/store';
import { RequestLessions, LessonActionTypes, LoadLessons } from './lesson.actions';
import { withLatestFrom, merge, mergeMap, map } from 'rxjs/operators';
import { selectAllLessions } from './lesson.reducer';
import { LoadCourses } from './course.actions';



@Injectable()
export class LessonEffects {

  constructor(
    private actions$: Actions,
    private service: CoursesService,
    private store: Store<AppState>
    ) {}

    @Effect()
    loadLessons$ = this.actions$.pipe(
      ofType<RequestLessions>(LessonActionTypes.RequestLessions),
      withLatestFrom(this.store.pipe(select(selectAllLessions))),
      mergeMap(() => this.service.findAllCourseLessons(1)),
      map(lessons => new LoadLessons({lessons}))
    );
}
