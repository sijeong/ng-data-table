import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { Observable } from "rxjs/Observable";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { AppState } from '../course/reducers';
import { RequestCourses } from '../course/course.actions';
import * as fromCouse from '../course/course.reducer';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    courses$: Observable<Course[]> = this.store.select(fromCouse.selectAllCourses);
    beginnerCourses$: Observable<Course[]> = this.courses$.pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
    );

    advancedCourses$: Observable<Course[]> = this.courses$.pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
    );

    constructor(private coursesService: CoursesService, private store: Store<AppState>) {

    }

    ngOnInit() {
        this.store.dispatch(new RequestCourses());

        // const courses$ = this.coursesService.findAllCourses();
        // const courses$ = this.store.select(fromCouse.selectAllCourses);

        // this.beginnerCourses$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.category === 'BEGINNER'))
        // );

        // this.advancedCourses$ = courses$.pipe(
        //     map(courses => courses.filter(course => course.category === 'ADVANCED'))
        // );
    }

}
