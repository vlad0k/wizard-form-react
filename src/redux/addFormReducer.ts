const ACCOUNT_FORM_FORWARD = 'addForm/ACCOUNT_FORM_FORWARD';
const GO_BACK = 'addForm/GO_BACK';
const PROFILE_FORM_FORWARD = 'addForm/PROFILE_FORM_FORWARD';
const STEP_3_FORM_SUBMIT = 'addForm/STEP_3_FORM_SUBMIT';
const STEP_4_FORM_SUBMIT = 'addForm/STEP_4_FORM_SUBMIT';
const MOVE_FORWARD = 'addForm/MOVE_FORWARD';
const CLEAR_FORM = 'addForm/CLEAR_FORM';

const SELECT_STEP = 'addForm/SELECT_STEP';

interface AccountFormForwardAction {
  type: typeof ACCOUNT_FORM_FORWARD;
  username: string;
  password: string;
  avatar: File | null;
}

interface GoBackAction {
  type: typeof GO_BACK;
}

interface Step2FormForwardAction {
  type: typeof PROFILE_FORM_FORWARD;
  firstname: string;
  lastname: string;
  birthdate: Date | undefined;
  email: string;
  adress: string;
  gender: 'male' | 'female' | null | undefined;
}

interface Step3FormForwardAction {
  type: typeof STEP_3_FORM_SUBMIT;
  company: string;
  facebook: string;
  github: string;
  mainLang: string;
  fax: string;
  phoneNumbers: Array<string>;
}

interface Step4FormSubmit {
  type: typeof STEP_4_FORM_SUBMIT;
  skills: string[];
  additionalInfo: string;
  hobbies: string[];
}

interface SelectStepAction {
  type: typeof SELECT_STEP;
  step: number;
}

interface SelectStepAction {
  type: typeof SELECT_STEP;
  step: number;
}

interface MoveForwardAction {
  type: typeof MOVE_FORWARD;
}

interface ClearFormAction {
  type: typeof CLEAR_FORM;
}

type AddFormActionsType =
  | AccountFormForwardAction
  | GoBackAction
  | Step2FormForwardAction
  | SelectStepAction
  | Step3FormForwardAction
  | Step4FormSubmit
  | MoveForwardAction
  | ClearFormAction;

const initialState = {
  currentStep: 0,

  avatar: null as File | null,
  username: '',
  password: '',

  firstname: '',
  lastname: '',
  birthdate: undefined as Date | undefined,
  email: '',
  adress: '',
  gender: null as 'male' | 'female' | null | undefined,

  company: '',
  facebook: '',
  github: '',
  mainLang: '',
  fax: '',
  phoneNumbers: [''],

  skills: [''],
  additionalInfo: '',
  hobbies: [''],
};

const addFormReducer = (state = initialState, action: AddFormActionsType) => {
  switch (action.type) {
    case ACCOUNT_FORM_FORWARD: {
      return {
        ...state,
        username: action.username,
        password: action.password,
        avatar: action.avatar,
        currentStep: 2,
      };
    }
    case GO_BACK: {
      return {
        ...state,
        currentStep: state.currentStep > 0 ? state.currentStep - 1 : 0,
      };
    }

    case PROFILE_FORM_FORWARD: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        adress: action.adress,
        birthdate: action.birthdate,
        email: action.email,
        firstname: action.firstname,
        gender: action.gender,
        lastname: action.lastname,
      };
    }

    case STEP_3_FORM_SUBMIT: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        company: action.company,
        facebook: action.facebook,
        github: action.github,
        mainLang: action.mainLang,
        fax: action.fax,
        phoneNumbers: action.phoneNumbers,
      };
    }

    case SELECT_STEP: {
      return {
        ...state,
        currentStep: action.step,
      };
    }

    case STEP_4_FORM_SUBMIT: {
      return {
        ...state,
        skills: action.skills,
        additionalInfo: action.additionalInfo,
        hobbies: action.hobbies,
      };
    }

    case MOVE_FORWARD: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }

    case CLEAR_FORM: {
      return {
        ...initialState,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default addFormReducer;

export const accountFormForward = (payload: {
  username: string;
  password: string;
  avatar: File | null;
}): AccountFormForwardAction => ({
  type: ACCOUNT_FORM_FORWARD,
  ...payload,
});

export const goBack = (): GoBackAction => ({ type: GO_BACK });

export const selectStep = (step: number): SelectStepAction => ({
  type: SELECT_STEP,
  step,
});

export const step2FormForward = (payload: {
  firstname: string;
  lastname: string;
  birthdate: Date | undefined;
  email: string;
  adress: string;
  gender: 'male' | 'female' | null | undefined;
}): Step2FormForwardAction => ({
  type: PROFILE_FORM_FORWARD,
  ...payload,
});

export const step3FormSubmit = (payload: {
  company: string;
  facebook: string;
  github: string;
  mainLang: string;
  fax: string;
  phoneNumbers: string[];
}): Step3FormForwardAction => ({
  type: STEP_3_FORM_SUBMIT,
  ...payload,
});

export const step4FormSubmit = (payload: {
  skills: string[];
  additionalInfo: string;
  hobbies: string[];
}) => ({
  type: STEP_4_FORM_SUBMIT,
  ...payload,
});

export const moveForward = (): MoveForwardAction => ({
  type: MOVE_FORWARD,
});

export const clearForm = (): ClearFormAction => ({ type: CLEAR_FORM });
