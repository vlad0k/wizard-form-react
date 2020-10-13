import { UserType } from '../types';

const IMPORT_USERS = 'users/IMPORT_USERS';
const DELETE_USER = 'users/DELETE_USER';

interface ImportUsersAction {
  type: typeof IMPORT_USERS;
  users: UserType[];
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
}

type ActionType = ImportUsersAction | DeleteUserAction;

const initialState: {
  users: UserType[];
} = {
  users: [],
};

const usersReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case IMPORT_USERS: {
      return {
        ...state,
        users: action.users,
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
