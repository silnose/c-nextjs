import 'isomorphic-fetch';
import { useState } from 'react';
import Error from '../../_error';
import ChannelGrid from '../../../components/ChannelGrid.js';
import Layout from '../../../components/Layout';
import PodcastList from '../../../components/PodcastList';
import PodcastPlayer from '../../../components/PodcastPlayer';

const Channel = ({ channel, audioClips, childChannels, statusCode }) => {
  const [openPodcast, setOpenPodcast] = useState(null);
  const handleOpenPodcast = (event, podcast) => {
    event.preventDefault();
    setOpenPodcast(podcast);
  };

  const handleOnClosePodcast = (event) => {
    console.log('jjdj');
    event.preventDefault();
    setOpenPodcast(null);
  };
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }
  return (
    <>
      <Layout title={channel.title}>
        <h1>{channel.title}</h1>
        {openPodcast && (
          <div className='modal'>
            <PodcastPlayer
              audioClip={openPodcast}
              onClose={handleOnClosePodcast}
            />
          </div>
        )}
        {childChannels.length > 0 && (
          <div>
            <h2>Series</h2>
            <hr />
            <ChannelGrid channels={childChannels} title='Series' />
          </div>
        )}
        <h2>Latest Podcasts</h2> <hr />
        <PodcastList
          audioClips={audioClips}
          handleOpenPodcast={handleOpenPodcast}
        />
      </Layout>
      <style jsx>{`
        h1 {
          left: 0;
          margin: 0;
          width: 100%;
          padding-left: 5px;
          font-weight: 800;
          text-align: center;
          padding-top: 15px;
          font-size: 3em;
        }
        h2 {
          padding: 5px;
          font-size: 1.4em;
          font-weight: 600;
          margin: 0;
          text-align: left;
        }
        hr {
          height: 1px;
          background-color: #ccc;
          border: none;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background-color: black;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query: { idc: id }, req }) {
  try {
    const channelID = id;
    let [reqChannel, reqAudio, reqChildChannels] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${channelID}`),
      fetch(`https://api.audioboom.com/channels/${channelID}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${channelID}/child_channels`),
    ]);

    if (reqChannel.status >= 400) {
      req.statusCode = reqChannel.status;
      return {
        props: {
          channel: null,
          audioClips: null,
          childChannels: null,
          statusCode: reqChannel.status,
        },
      };
    }
    let responseChannel = await reqChannel.json();
    let channel = responseChannel.body.channel;
    let responseAudio = await reqAudio.json();
    let audioClips = responseAudio.body.audio_clips;
    let responseChildChannels = await reqChildChannels.json();
    let childChannels = responseChildChannels.body.channels;

    return { props: { channel, audioClips, childChannels, statusCode: 200 } };
  } catch (error) {
    let statusCode = 503;
    req.statusCode = statusCode;
    return {
      props: {
        channel: null,
        audioClips: null,
        childChannels: null,
        statusCode: statusCode,
      },
    };
  }
}
export default Channel;
