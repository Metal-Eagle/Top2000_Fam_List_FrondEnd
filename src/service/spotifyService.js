function doSpotifyLogin() {
    const CLIENT_ID = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
    const callbackUrl = "/spotifyCallback";
    const REDIRECT_URI = `${process.env.VUE_APP_FRONTEND_URL}${callbackUrl}`;
    //add addEventListener
    window.addEventListener("storage", function (e) {
        let changeUrl = new URL(e.url);
        if (e.key === "vuex" && changeUrl.pathname === callbackUrl) {
            //Reload page
            location.reload();
        }
    });

    function getLoginURL(scopes) {
        return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token`;
    }
    const url = getLoginURL(["playlist-modify", "playlist-modify-private"]),
        width = 450,
        height = 730,
        left = screen.width / 2 - width / 2,
        top = screen.height / 2 - height / 2;
    window.open(
        url,
        "Spotify",
        `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top= ${top}, left=${left}`
    );
}
export {
    doSpotifyLogin
}