import api from './api.service.js';

const URL = 'https://api.twitch.tv/helix/';

export const getLiveStream = async (login) => {
    const data = await api.get(URL + 'streams' + '?user_login=' + login);
    return data.data.data;
}

export const getStreamedGame = async (gameId) => {
    const data = await api.get(URL + 'games' + '?id=' + gameId);
    let dataArray = data.data.data;

    let formatData = dataArray.map( game => {
        let imgUrl = game.box_art_url
        .replace('{width}', '370')
        .replace('{height}', '538')

        game.box_art_url = imgUrl;
        return game;
    })

    return formatData;
}

export const getUserByLogin = async (login) => {
    const data = await api.get(URL + 'users' + '?login=' + login);
    let dataArray = data.data.data;

    return dataArray;
}