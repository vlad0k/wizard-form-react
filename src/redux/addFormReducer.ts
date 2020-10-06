const ACCOUNT_FORM_FORWARD = "addForm/ACCOUNT_FORM_FORWARD";
const GO_BACK = "addForm/GO_BACK";
const PROFILE_FORM_FORWARD = "addForm/PROFILE_FORM_FORWARD";

const SELECT_STEP = "addForm/SELECT_STEP";

interface AccountFormForwardAction {
  type: typeof ACCOUNT_FORM_FORWARD;
  username: string;
  password: string;
}

interface GoBackAction {
  type: typeof GO_BACK;
}

interface ProfileFormForwardAction {
  type: typeof PROFILE_FORM_FORWARD;
  firstname: string;
  lastname: string;
  birthdate: string;
  email: string;
  adress: string;
  gender: string;
}

interface SelectStepAction {
  type: typeof SELECT_STEP;
  step: number;
}

type AddFormActionsType =
  | AccountFormForwardAction
  | GoBackAction
  | ProfileFormForwardAction
  | SelectStepAction;

const initialState = {
  currentStep: 4,
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  birthdate: "",
  email: "",
  adress: "",
  gender: "",
};

const addFormReducer = (state = initialState, action: AddFormActionsType) => {
  switch (action.type) {
    case ACCOUNT_FORM_FORWARD: {
      return {
        ...state,
        username: action.username,
        password: action.password,
        currentStep: 2,
      };
    }
    case GO_BACK: {
      return {
        ...state,
        currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1,
      };
    }

    case PROFILE_FORM_FORWARD: {
      return {
        ...state,
        currentStep: 3,
        adress: action.adress,
        birthdate: action.birthdate,
        email: action.email,
        firstname: action.firstname,
        gender: action.gender,
        lastname: action.lastname,
      };
    }

    case SELECT_STEP: {
      return {
        ...state,
        currentStep: action.step,
      };
    }

    default: {
      return state;
    }
  }
};

export default addFormReducer;

export const accountFormForward = (
  username: string,
  password: string
): AccountFormForwardAction => ({
  type: ACCOUNT_FORM_FORWARD,
  username,
  password,
});

export const goBack = (): GoBackAction => ({ type: GO_BACK });

export const profileFormForward = (
  adress: string,
  birthdate: string,
  email: string,
  firstname: string,
  gender: string,
  lastname: string
): ProfileFormForwardAction => ({
  type: PROFILE_FORM_FORWARD,
  adress,
  birthdate,
  email,
  firstname,
  gender,
  lastname,
});

export const selectStep = (step: number): SelectStepAction => ({
  type: SELECT_STEP,
  step,
});
