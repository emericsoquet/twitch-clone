import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';

export default function LiveStream() {

    let { slug } = useParams();

    return (
        <>
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}></ReactTwitchEmbedVideo>
        </>
    )
}