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
    spotifyAccessToken: {
        access_token: null,
        expires_in: null,
        token_type: null,
        expiresAt: +new Date
    },
    spotifyUser: []
}
export default state