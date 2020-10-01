const FORWARD_TO_STEP_2 = "addForm/FORWARD_TO_STEP_2";

interface ForwardToStep2Action {
  type: typeof FORWARD_TO_STEP_2;
  username: string;
  password: string;
}

type AddFormActionsType = ForwardToStep2Action;

const initialState = {
  currentStep: 1,
  username: "",
  password: "",
};

const addFormReducer = (state = initialState, action: AddFormActionsType) => {
  switch (action.type) {
    case FORWARD_TO_STEP_2: {
      return {
        ...state,
        username: action.username,
        password: action.password,
        currentStep: 2,
      };
    }
    default: {
      return state;
    }
  }
};

export default addFormReducer;

export const forwardToStep2 = (
  username: string,
  password: string
): ForwardToStep2Action => ({ type: FORWARD_TO_STEP_2, username, password });
