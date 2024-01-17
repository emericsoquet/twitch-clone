import axios from 'axios'

let api = axios.create({
    headers: {
        'Client-ID': '8oykh18covsabzf18ima8i3xf5dpij',
        'Authorization': 'Bearer 7xwclbuqm3kymbhyv1oxvl0o6gako9'
    }
})

/*
    CLIENT_ID = 8oykh18covsabzf18ima8i3xf5dpij
    REDIRECT = 'http://locahost:4000/'


    AUTHH LINK = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

    AUTH COMPLETED = https://id.twitch.tv/oauth2/authorize?client_id=8oykh18covsabzf18ima8i3xf5dpij&redirect_uri=http://localhost:4000/&response_type=token
*/

export default api

