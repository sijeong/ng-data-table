import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { CourseComponent } from "./course/course.component";
import {
    MatInputModule, MatListModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatSortModule,
    MatTableModule,
    MatToolbarModule
} from "@angular/material";
import { CoursesService } from "./services/courses.service";
import { HttpClientModule } from "@angular/common/http";
import { CourseResolver } from "./services/course.resolver";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiService } from './api.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { CourseEffects } from './course/course.effects';
import { LessonEffects } from './course/lesson.effects';
import { reducers, metaReducers } from './course/reducers';

import * as fromCourse from './course/course.reducer';
import * as fromLesson from './course/lesson.reducer';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        CourseComponent,
        CoursesCardListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
        HttpClientInMemoryWebApiModule.forRoot(ApiService, { passThruUnknownUrl: true }),
        StoreModule.forRoot(reducers, { metaReducers }),

        EffectsModule.forRoot([CourseEffects, LessonEffects]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                name: 'Data Table Sample'
            }),
        StoreModule.forFeature('course', fromCourse.reducer),
        StoreModule.forFeature('lesson', fromLesson.reducer),
        
    ],
    providers: [
        CoursesService,
        CourseResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
