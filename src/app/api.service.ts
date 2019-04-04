import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Course } from './model/course';
import { Lesson } from './model/lesson';

import * as faker from 'faker/locale/en_US';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ApiService implements InMemoryDbService {
  createDb(reqInfo?: import("angular-in-memory-web-api").RequestInfo): {} | import("rxjs").Observable<{}> | Promise<{}> {
    // throw new Error("Method not implemented.");
    const categories = ['BEGINNER', 'ADVANCED'];
    const getCourses = (count = 100) => {
      const res = [];
      for (let i = 0; i < count; i++) {
        res.push({
          id: i + 1,
          description: faker.lorem.sentences,
          iconUrl: faker.internet.avatar,
          courseListIcon: faker.image.cats,
          longDescription: faker.lorem.paragraphs,
          category: categories[faker.random.number(1)],
          lessonsCount: 10
        })
      }
      return res;
    }
    const getLessons = (count = 100) => {
      const res = [];
      for (let i = 0; i < count; i++) {
        res.push({
          id: i + 1,
          description: faker.lorem.sentences,
          duration: '',
          seqNo: i + 1,
          couseId: i + 1
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
