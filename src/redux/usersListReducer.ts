import { IndexableType } from 'dexie';
import { FormikValues } from 'formik';
import { Dispatch } from 'redux';

import db, {
  addUser as addUserToDb,
  deleteAllUsers,
  getUsers,
  updateUser as updateUserToDb,
} from '../db';
import { UsersFetchStatus, UserType } from '../types';
import createFakeUser from '../utils/createFakeUser';
import { createNotification } from '../utils/notifications';

const NUMBER_OF_FAKES = 50;

const IMPORT_USERS = 'users/IMPORT_USERS';
const DELETE_USER = 'users/DELETE_USER';
const IS_FETCHING = 'users/IS_FETCHING';
const SELECT_PAGE = 'users/SELECT_PAGE';
const ADD_USER = 'users/ADD_USER';
const UPDATE_ADD_USER_PENDING = 'user/UPDATE_ADD_USER_PENDING';

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

interface AddUserAction {
  type: typeof ADD_USER;
  user: UserType;
}

interface UpdateUserPengingAction {
  type: typeof UPDATE_ADD_USER_PENDING;
  pending: boolean;
}

type ActionType =
  | ImportUsersAction
  | DeleteUserAction
  | IsFetchingAction
  | SelectPage
  | AddUserAction
  | UpdateUserPengingAction;

const initialState = {
  users: [] as UserType[],
  usersFetchStatus: UsersFetchStatus.unfetched as UsersFetchStatus,
  addUserPending: false,
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

    case ADD_USER: {
      return {
        ...state,
        users: [...state.users, action.user],
        addUserPending: false,
      };
    }

    case UPDATE_ADD_USER_PENDING: {
      return {
        ...state,
        addUserPending: action.pending,
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

export const addUserActionCreator = (user: UserType): AddUserAction => ({
  type: ADD_USER,
  user,
});

export const updateAddUserPenging = (pending: boolean): UpdateUserPengingAction => ({
  type: UPDATE_ADD_USER_PENDING,
  pending,
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
  dispatch(updateAddUserPenging(true));
  return addUserToDb(user)
    .then((user) => {
      createNotification({
        message: `@${user.username} added to db`,
        type: 'success',
      });
      dispatch(addUserActionCreator(user));
    })
    .catch((msg) => {
      dispatch(updateAddUserPenging(false));
      createNotification({ message: msg, type: 'danger' });
      return new Promise((resolve, reject) => {
        reject();
      });
    });
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
    getUsers().then((users: UserType[]) => {
      dispatch(importUsersActionCreator(users));
      const user = users.find((user) => id === user.id);
      const username = user && user.username;
      createNotification({ title: 'Saved', message: `@${username} was updated`, type: 'success' });
    });
  });
};

//TODO rewrite function to import a bunch of users on promises NOT AWAIT
export const generateUsers = () => (dispatch: Dispatch) => {
  createNotification({ message: 'Generating fake users...' });
  dispatch(usersFetchStatus(UsersFetchStatus.isFetching));
  deleteAllUsers();
  for (let i = 1; i <= NUMBER_OF_FAKES; i++) {
    let fake = createFakeUser();
    const fetchAvatar = async () => {
      const response = await fetch(fake.avatar);
      const blob = await response.blob();
      await addUserToDb({ ...fake, avatar: new File([blob], 'avatar', { type: 'image/jpg' }) });
      const users = await getUsers();
      dispatch(importUsersActionCreator(users));
      if (i === NUMBER_OF_FAKES) {
        createNotification({
          title: 'Success',
          message: 'Fake users were generated',
          type: 'success',
        });
        dispatch(usersFetchStatus(UsersFetchStatus.fetched));
      }
    };
    fetchAvatar();
  }
};
