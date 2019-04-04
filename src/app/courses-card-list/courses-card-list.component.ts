import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { AppState } from '../course/reducers';
import { Store } from '@ngrx/store';
import { SelectCourse } from '../course/course.actions';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    constructor(
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
    }

    onClick(course){
        console.log('clicked Course: ', course);
        this.store.dispatch(new SelectCourse(course));
    }

}
