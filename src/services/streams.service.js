import api from './api.service.js';

const URL = 'https://api.twitch.tv/helix/';

export const getStreams = async () => {
    const data = await api.get(URL + 'streams');
    return data.data.data;
}

export const getGames = async (gamesList) => {
    const data = await api.get(URL + 'games?' + gamesList);
    return data.data.data;
}

export const getUsers = async (usersList) => {
    const data = await api.get(URL + 'users?' + usersList);
    return data.data.data;
}

export const requestElementById = async (arr) => {
    let params = '';
    arr.map( id => (params = params + 'id=' + id + '&'));
    return params;
}

/* const requestElementById = async (arr, req, baseUrl) => {

    arr.map( id => (req = req + `id=${id}&`) );
    let url = baseUrl + req;
    
    let res = await api.get(url);
    let resData = res.data.data;

    return resData
} */

export const getTopStreams = async () => {
    const streams = await getStreams();

    const usersId = streams.map( stream => stream.user_id );
    const usersParams = await requestElementById(usersId)
    const users = await getUsers(usersParams);

    const gamesId = streams.map( stream => stream.game_id );
    const gamesParams = await requestElementById(gamesId);
    const games = await getGames(gamesParams);

    let listTopStreams = streams.map( stream => {
        stream.truePic = '';
        stream.box_art_url = '';
        users.forEach( user => {
            games.forEach( game => {
                if(stream.user_id === user.id && stream.game_id === game.id) {
                    stream.truePic = user.profile_image_url;
                    stream.box_art_url = game.box_art_url;
                }
            });
        });

        let thumbnail = stream.thumbnail_url
        .replace("{width}", "320")
        .replace("{height}", "180");
        stream.thumbnail_url = thumbnail;

        let boxArt = stream.box_art_url
        .replace("{width}", "370")
        .replace("{height}", "538");
        stream.box_art_url = boxArt;
        

        return stream;
    })

    return listTopStreams;
}

export const getTopStreamsByLanguage = async (country) => {
    const topStreams = await getTopStreams();

    let topStreamsByLanguage = topStreams.filter( stream => (stream.language === country) );
    return topStreamsByLanguage;
}

