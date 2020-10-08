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

export type UserType = {
  additionalInfo: string;
  adress: string;
  avatar: File | null;
  birthdate: Date | undefined;
  company: string;
  email: string;
  facebook: string;
  fax: string;
  firstname: string;
  gender: 'male' | 'female' | undefined | null;
  github: string;
  hobbies: string[];
  id: number | string;
  lastname: string;
  mainLang: string;
  password: string;
  phoneNumbers: string[];
  skills: string[];
  username: string;
};
