import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Course } from './model/course';
import { Lesson } from './model/lesson';

import * as faker from 'faker';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ApiService implements InMemoryDbService {
  createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
    // throw new Error("Method not implemented.");
    const courseNum = 100;
    const lessonNum = 1000;
    const categories = ['BEGINNER', 'ADVANCED'];
    const getCourses = (count = courseNum) => {
      const res = [];
      for (let i = 0; i < count; i++) {
        res.push({
          id: i + 1,
          description: faker.lorem.sentence(),
          iconUrl: faker.internet.avatar(),
          courseListIcon: faker.image.cats(),
          longDescription: faker.lorem.paragraphs(),
          category: categories[faker.random.number(1)],
          lessonsCount: courseNum/lessonNum
        })
      }
      return res;
    }
    const getLessons = (count = lessonNum) => {
      const res = [];
      for (let i = 0; i < count; i++) {
        res.push({
          id: i + 1,
          description: faker.lorem.sentences(),
          duration: '',
          seqNo: i + 1,
          couseId: faker.random.number(courseNum)
        })
      }
      return res;
    }
    const courses: Course[] = getCourses();
    const lessons: Lesson[] = getLessons();

    const db = { courses, lessons };
    let returnType = 'observable';

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
      }

      returnType = body.returnType || 'object';
    }
    switch (returnType) {
      case 'observable':
        return of(db).pipe(delay(10));
      default:
        return db;
    }
  }

  constructor() { }
}
