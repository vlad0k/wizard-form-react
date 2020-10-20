import { UsersFetchStatus, UserType } from '../types';
import db, { deleteAllUsers, getUsers } from '../db';
import { IndexableType } from 'dexie';
import { Dispatch } from 'redux';
import { FormikValues } from 'formik';
import { addUser as addUserToDb, updateUser as updateUserToDb } from '../db';
import createFakeUser from '../utils/createFakeUser';
import xhr from 'xhr';
import { throttle } from 'lodash';

const IMPORT_USERS = 'users/IMPORT_USERS';
const DELETE_USER = 'users/DELETE_USER';
const IS_FETCHING = 'users/IS_FETCHING';
const SELECT_PAGE = 'users/SELECT_PAGE';

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

interface SelectPage {
  type: typeof SELECT_PAGE;
  page: number;
}

type ActionType = ImportUsersAction | DeleteUserAction | IsFetchingAction | SelectPage;

const initialState = {
  users: [] as UserType[],
  usersFetchStatus: UsersFetchStatus.unfetched as UsersFetchStatus,
  page: 1,
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

    case SELECT_PAGE: {
      return {
        ...state,
        page: action.page,
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

export const selectPage = (page: number): SelectPage => ({
  type: SELECT_PAGE,
  page,
});

export const importUsers = () => async (dispatch: Dispatch) => {
  dispatch(usersFetchStatus(UsersFetchStatus.isFetching));
  getUsers().then((users: UserType[]) => {
    dispatch(importUsersActionCreator(users));
    dispatch(usersFetchStatus(UsersFetchStatus.fetched));
  });
};

export const addUser = (user: UserType) => (dispatch: Dispatch) => {
  addUserToDb(user);
  getUsers().then((users: UserType[]) => dispatch(importUsersActionCreator(users)));
};

export const deleteUser = (id: IndexableType) => (dispatch: Dispatch) => {
  db.table('users')
    .delete(id)
    .then(async () => {
      const users = await db.table('users').toArray();
      dispatch(importUsersActionCreator(users));
    });
};

export const updateUser = (id: number, values: FormikValues) => (dispatch: Dispatch) => {
  updateUserToDb(id, values).then(() => {
    getUsers().then((users: UserType[]) => dispatch(importUsersActionCreator(users)));
  });
};

export const generateUsers = throttle(
  () => (dispatch: Dispatch) => {
    deleteAllUsers();
    for (let i = 0; i < 50; i++) {
      let fake = createFakeUser();
      xhr.get(fake.avatar, { responseType: 'blob' }, (err, res) => {
        addUserToDb({ ...fake, avatar: res.statusCode === 200 ? res.body : undefined }).then(() => {
          getUsers().then((users: UserType[]) => dispatch(importUsersActionCreator(users)));
        });
      });
    }
  },
  2000,
);
