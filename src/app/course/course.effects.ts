import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoursesService } from '../services/courses.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { RequestCourses, CourseActionTypes, LoadCourses } from './course.actions';
import { withLatestFrom, mergeMap, map } from 'rxjs/operators';
import { selectAllCourses } from './course.reducer';


@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private service: CoursesService,
    private store: Store<AppState>
    ) { }

  @Effect()
  loadCourses$ = this.actions$.pipe(
    ofType<RequestCourses>(CourseActionTypes.RequestCourses),
    withLatestFrom(this.store.pipe(select(selectAllCourses))),
    mergeMap(() => this.service.findAllCourses()),
    map(courses => new LoadCourses({ courses }))
  );
}
