import 'isomorphic-fetch';

const Channel = ({ channel, audioClips, childChannels }) => {
  return (
    <>
      <header>Podcasts</header>
      <h1>{channel.title}</h1>
      {audioClips.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}
      ---
      {childChannels.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  console.log(query);
  const channelID = query.id;
  let reqChannel = await fetch(
    `https://api.audioboom.com/channels/${channelID}`
  );
  let responseChannel = await reqChannel.json();
  let channel = responseChannel.body.channel;

  let reqAudio = await fetch(
    `https://api.audioboom.com/channels/${channelID}/audio_clips`
  );
  let responseAudio = await reqAudio.json();
  let audioClips = responseAudio.body.audio_clips;

  let reqChildChannels = await fetch(
    `https://api.audioboom.com/channels/${channelID}/child_channels`
  );
  let responseChildChannels = await reqChildChannels.json();
  let childChannels = responseChildChannels.body.channels;

  return { props: { channel, audioClips, childChannels } };
}
export default Channel;
