import api from './api.service.js';

const URL = 'https://api.twitch.tv/helix/';

export const getLiveStream = async (login) => {
    const data = await api.get(URL + 'streams' + '?user_login=' + login);
    return data.data.data;
}

export const getStreamedGame = async (gameId) => {
    const data = await api.get(URL + 'games' + '?id=' + gameId);
    return data.data.data;
}

export const getUserByLogin = async (login) => {
    const data = await api.get(URL + 'users' + '?login=' + login);
    return data.data.data;
}