const state = {
    mainName: null,
    mainId: null,
    songs: null,
    users: null,
    error: {
        timeOut: null,
        msg: null,
        show: false,
    },
    playingSong: {
        id: null,
        isPlaying: false,
        isFirstSongPlaying: true,
        Audio: null
    },
}
export default state