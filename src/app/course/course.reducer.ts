import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Course } from '../model/course';
import { CourseActions, CourseActionTypes } from './course.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CourseState extends EntityState<Course> {
  // additional entities state properties
  selectedCourse: Course;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CourseState = adapter.getInitialState({
  // additional entity state properties
  selectedCourse: null
});

export function reducer(
  state = initialState,
  action: CourseActions
): CourseState {
  switch (action.type) {
    case CourseActionTypes.RequestCourses: {
      return { ...state }
    }
    case CourseActionTypes.SelectCourse: {
      return { ...state, selectedCourse: action.payload.course };
    }
    case CourseActionTypes.AddCourse: {
      return adapter.addOne(action.payload.course, state);
    }

    case CourseActionTypes.UpsertCourse: {
      return adapter.upsertOne(action.payload.course, state);
    }

    case CourseActionTypes.AddCourses: {
      return adapter.addMany(action.payload.courses, state);
    }

    case CourseActionTypes.UpsertCourses: {
      return adapter.upsertMany(action.payload.courses, state);
    }

    case CourseActionTypes.UpdateCourse: {
      return adapter.updateOne(action.payload.course, state);
    }

    case CourseActionTypes.UpdateCourses: {
      return adapter.updateMany(action.payload.courses, state);
    }

    case CourseActionTypes.DeleteCourse: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CourseActionTypes.DeleteCourses: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CourseActionTypes.LoadCourses: {
      return adapter.addAll(action.payload.courses, state);
    }

    case CourseActionTypes.ClearCourses: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
export const selectCouseState = createFeatureSelector<CourseState>('course');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllCourses = createSelector(selectCouseState, selectAll);
