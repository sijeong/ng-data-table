import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Lesson } from '../model/lesson';
import { LessonActions, LessonActionTypes } from './lesson.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface LessonState extends EntityState<Lesson> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Lesson> = createEntityAdapter<Lesson>();

export const initialState: LessonState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: LessonActions
): LessonState {
  switch (action.type) {
    case LessonActionTypes.AddLesson: {
      return adapter.addOne(action.payload.lesson, state);
    }

    case LessonActionTypes.UpsertLesson: {
      return adapter.upsertOne(action.payload.lesson, state);
    }

    case LessonActionTypes.AddLessons: {
      return adapter.addMany(action.payload.lessons, state);
    }

    case LessonActionTypes.UpsertLessons: {
      return adapter.upsertMany(action.payload.lessons, state);
    }

    case LessonActionTypes.UpdateLesson: {
      return adapter.updateOne(action.payload.lesson, state);
    }

    case LessonActionTypes.UpdateLessons: {
      return adapter.updateMany(action.payload.lessons, state);
    }

    case LessonActionTypes.DeleteLesson: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LessonActionTypes.DeleteLessons: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case LessonActionTypes.LoadLessons: {
      return adapter.addAll(action.payload.lessons, state);
    }

    case LessonActionTypes.ClearLessons: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const selectLessonState = createFeatureSelector<LessonState>('lesson');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllLessions = createSelector(selectLessonState, selectAll);