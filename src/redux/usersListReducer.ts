import { UsersFetchStatus, UserType } from '../types';
import db from '../db/db';
import { IndexableType } from 'dexie';
import { Dispatch } from 'redux';

const IMPORT_USERS = 'users/IMPORT_USERS';
const DELETE_USER = 'users/DELETE_USER';
const IS_FETCHING = 'users/IS_FETCHING';

interface ImportUsersAction {
  type: typeof IMPORT_USERS;
  users: UserType[];
}

interface IsFetchingAction {
  type: typeof IS_FETCHING;
  usersFetchStatus: UsersFetchStatus;
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
}

type ActionType = ImportUsersAction | DeleteUserAction | IsFetchingAction;

const initialState = {
  users: [] as UserType[],
  usersFetchStatus: UsersFetchStatus.unfetched as UsersFetchStatus,
};

const usersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case IMPORT_USERS: {
      return {
        ...state,
        users: action.users,
        usersFetchStatus: UsersFetchStatus.fetched,
      };
    }

    case IS_FETCHING: {
      return {
        ...state,
        usersFetchStatus: action.usersFetchStatus,
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;

export const importUsersActionCreator = (users: UserType[]): ImportUsersAction => ({
  type: IMPORT_USERS,
  users,
});

export const deleteUserActionCreator = (): DeleteUserAction => ({ type: DELETE_USER });

export const usersFetchStatus = (usersFetchStatus: UsersFetchStatus): IsFetchingAction => ({
  type: IS_FETCHING,
  usersFetchStatus,
});

export const importUsers = () => async (dispatch: Dispatch) => {
  dispatch(usersFetchStatus(UsersFetchStatus.isFetching));
  const users: UserType[] = await db.table('users').toArray();
  dispatch(importUsersActionCreator(users));
  return users;
};

export const deleteUser = (id: IndexableType) => (dispatch: Dispatch) => {
  db.table('users')
    .delete(id)
    .then(async () => {
      const users = await db.table('users').toArray();
      dispatch(importUsersActionCreator(users));
    });
};

export const addUser = (user: UserType) => (dispatch: Dispatch) => {
  db.table('users')
    .add(user)
    .then(async () => {
      const users = await db.table('users').toArray();
      dispatch(importUsersActionCreator(users));
    });
};
