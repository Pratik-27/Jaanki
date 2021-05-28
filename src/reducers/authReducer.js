const initialState = {isLoggedin: false, userInfo: '', medium: ''};

const auth = (state = {...initialState}, action) => {
  switch (action.type) {
    /*****************
     * START
     * Description: Call action for setting user data
     * Dependencies: None
     * @returns {Promise<void>}
     */
    case 'isLoggedin':
      return {
        ...state,
        isLoggedin: action.isLoggedin,
      };

    case 'medium':
      return {
        ...state,
        medium: action.medium,
      };
    /********************* END ********************/

    /*****************
     * START
     * Description: Call action for setting user data
     * Dependencies: None
     * @returns {Promise<void>}
     */
    case 'userInfo':
      return {
        ...state,
        userInfo: action.userInfo,
      };
    /********************* END ********************/

    default:
      return state;
  }
  /********************* END ********************/
};
export default auth;
