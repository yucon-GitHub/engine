/* public store commit Methods */

export default {
    setUserInfo (state, val) {
        state.user_Info = Object.assign(state.user_Info, val);
    }
}
