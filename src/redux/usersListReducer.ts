import { UserType } from '../types';

const IMPORT_USERS = 'users/IMPORT_USERS';
const DELETE_USER = 'users/DELETE_USER';
const IS_FETCHING = 'users/IS_FETCHING';

interface ImportUsersAction {
  type: typeof IMPORT_USERS;
  users: UserType[];
}

interface IsFetchingAction {
  type: typeof IS_FETCHING;
  isFetching: boolean;
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
}

type ActionType = ImportUsersAction | DeleteUserAction | IsFetchingAction;

const initialState = {
  users: [] as UserType[],
  isFetching: false,
};

const usersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case IMPORT_USERS: {
      return {
        ...state,
        users: action.users,
        isFetching: false,
      };
    }

    case IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;

export const importUsers = (users: UserType[]): ImportUsersAction => ({
  type: IMPORT_USERS,
  users,
});

export const deleteUser = (): DeleteUserAction => ({ type: DELETE_USER });

export const isFetching = (isFetching: boolean): IsFetchingAction => ({
  type: IS_FETCHING,
  isFetching,
});
