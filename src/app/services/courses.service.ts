

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Course } from "../model/course";
import { map, tap, catchError } from "rxjs/operators";
import { Lesson } from "../model/lesson";
import { throwError } from "rxjs/internal/observable/throwError";


@Injectable()
export class CoursesService {
    serviceUrl = '' //'http://localhost:9000/';

    constructor(private http: HttpClient) {

    }

    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(this.serviceUrl + `api/courses/${courseId}`)
            .pipe(
                tap(d => { console.log('findCourseById: ', d) }),
                catchError(this.handleError)
            );
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>('api/courses')
            .pipe(
                // map(res => res['payload']),
                tap(d => {
                    console.log(this.serviceUrl);
                    console.log('findAllCourses: ', d);
                }),
                catchError(this.handleError)
            );
    }

    findAllCourseLessons(courseId: number): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(this.serviceUrl + 'api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            //map(res => res["payload"]),
            tap(d => console.log('findAllCourseLessions: ', d)),
            catchError(this.handleError)
        );
    }

    findLessons(
        courseId: number, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3): Observable<Lesson[]> {

        return this.http.get<Lesson[]>(this.serviceUrl + 'api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            // map(res => res["payload"]),
            tap(d => console.log('findLessons: ', d)),
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error(error);
        return throwError(error);
    }
}