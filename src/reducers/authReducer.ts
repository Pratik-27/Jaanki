// types.ts (define your types in a separate file if needed)
export interface AuthState {
  isLoggedin: boolean;
  userInfo: string;
  medium: string;
}

export interface AuthAction {
  type: 'isLoggedin' | 'userInfo' | 'medium';
  isLoggedin?: boolean;
  userInfo?: string;
  medium?: string;
}

// authReducer.ts
const initialState: AuthState = {
  isLoggedin: false,
  userInfo: '',
  medium: '',
};

const auth = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'isLoggedin':
      return {
        ...state,
        isLoggedin: action.isLoggedin ?? state.isLoggedin,
      };

    case 'medium':
      return {
        ...state,
        medium: action.medium ?? state.medium,
      };

    case 'userInfo':
      return {
        ...state,
        userInfo: action.userInfo ?? state.userInfo,
      };

    default:
      return state;
  }
};

export default auth;
