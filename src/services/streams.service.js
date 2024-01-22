import api from './api.service.js';

const URL = 'https://api.twitch.tv/helix/';

export const getStreams = async () => {
    const data = await api.get(URL + 'streams');
    return data.data.data;
}

export const getGames = async (gamesList) => {
    const data = await api.get(URL + 'games?' + gamesList);
    console.log(data)
}

export const getUsers = async (usersList) => {
    const data = await api.get(URL + 'users?' + usersList);
    return data.data.data;
}

export const getTopStreams = async () => {
    const streams = await getStreams();

    const usersId = streams.map( stream => stream.user_id );
    let   params  = '';
    usersId.map( id => (params = params + 'id=' + id + '&') );
    console.log(params)
    const users = await getUsers(params);

    console.log(users)

    let listTopStreams = streams.map( stream => {
        stream.truePic = '';
        users.forEach( user => {
            if(stream.user_id === user.id) {
                stream.truePic = user.profile_image_url
            }
        })
        return stream;
    })

    return listTopStreams;
}

