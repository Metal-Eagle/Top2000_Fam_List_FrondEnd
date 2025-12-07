const mutations = {
    ADDMAINNAMEADNID(state, items) {
        const {
            id,
            name
        } = items
        state.mainId = id
        state.mainName = name
    },
    ADDSONGS(state, songs) {
        state.songs = songs
    },
    ADD_USERS(state, users) {
        state.users = users
    },
    CHANGE_PLAYING_SONG(state, song) {
        state.playingSong = song
    },
    SHOWERRORMSG(state, error) {
        state.error = error
    }

}
export default mutations