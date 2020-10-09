import { UserType } from '../types';

const IMPORT_USERS = 'users/IMPORT_USERS';

interface ImportUsersAction {
  type: typeof IMPORT_USERS;
  users: UserType[];
}

type ActionType = ImportUsersAction;

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
