import { UsersFetchStatus, UserType } from '../types';
import db, {
  addUser as addUserToDb,
  deleteAllUsers,
  getUsers,
  updateUser as updateUserToDb,
} from '../db';
import { IndexableType } from 'dexie';
import { Dispatch } from 'redux';
import { FormikValues } from 'formik';
import createFakeUser from '../utils/createFakeUser';
import { store } from 'react-notifications-component';

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
    getUsers().then((users: UserType[]) => {
      dispatch(importUsersActionCreator(users));
      const user = users.find((user) => id === user.id);
      const username = user && user.username;
      store.addNotification({
        title: 'Saved',
        message: `@${username} was updated`,
        type: 'success',
        insert: 'top',
        container: 'bottom-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 3000,
        },
      });
    });
  });
};

//TODO rewrite function to import a bunch of users
export const generateUsers = () => (dispatch: Dispatch) => {
  const NUMBER_OF_FAKES = 50;
  store.addNotification({
    title: 'Generating fake users...',
    message: ' ',
    type: 'warning',
    insert: 'top',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
    },
  });
  dispatch(usersFetchStatus(UsersFetchStatus.isFetching));
  deleteAllUsers();
  for (let i = 1; i <= NUMBER_OF_FAKES; i++) {
    let fake = createFakeUser();
    const fetchAvatar = async () => {
      const response = await fetch(fake.avatar);
      const blob = await response.blob();
      await addUserToDb({ ...fake, avatar: new File([blob], 'avatar.jpeg') });
      const users = await getUsers();
      dispatch(importUsersActionCreator(users));
      if (i === NUMBER_OF_FAKES) {
        store.addNotification({
          title: 'Success',
          message: 'Fake users were generated',
          type: 'success',
          insert: 'top',
          container: 'bottom-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 3000,
          },
        });
        dispatch(usersFetchStatus(UsersFetchStatus.fetched));
      }
    };
    fetchAvatar();
  }
};
