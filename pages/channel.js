import 'isomorphic-fetch';
import Link from 'next/link';

const Channel = ({ channel, audioClips, childChannels }) => {
  return (
    <>
      <nav>
        <Link href='/'>
          <a className='close'>
            <b>Go Back</b>
          </a>
        </Link>
      </nav>

      <div
        className='banner'
        style={{
          backgroundImage: `url(${channel.urls.banner_image.original})`,
        }}
      />

      <h1>{channel.title}</h1>

      {childChannels.length > 0 && (
        <div>
          <h2>Series</h2>
          <div className='channels'>
            {childChannels.map((item) => (
              <Link href={`/channel?id=${item.id}`} prefetch>
                <a className='channel'>
                  <img src={item.urls.logo_image.original} alt='' />
                  <h2>{item.title}</h2>
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2>Ultimos Podcasts</h2>
      {audioClips.map((clip, index) => (
        <div key={index}>
          <Link href={`/podcast?id=${clip.id}`}>
            <a className='podcast'>
              <h3>{clip.title}</h3>
              <div className='meta'>
                {Math.ceil(clip.duration / 60)} minutes
              </div>
            </a>
          </Link>
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
        nav {
          background: none;
        }
        nav a {
          display: inline-block;
          padding: 15px;
          color: white;
          cursor: pointer;
          text-decoration: none;
          background-color: #5e3b8c;
          margin: 15px;
          border-radius: 5px 25px;
        }
        .banner {
          width: 100%;
          padding-bottom: 25%;
          background-position: 50% 50%;
          background-size: cover;
          background-color: #aaa;
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
        h1 {
          font-weight: 600;
          padding: 15px;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
        }

        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  console.log(query);
  const channelID = query.id;
  let [reqChannel, reqAudio, reqChildChannels] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${channelID}`),
    fetch(`https://api.audioboom.com/channels/${channelID}/audio_clips`),
    fetch(`https://api.audioboom.com/channels/${channelID}/child_channels`),
  ]);
  let responseChannel = await reqChannel.json();
  let channel = responseChannel.body.channel;
  let responseAudio = await reqAudio.json();
  let audioClips = responseAudio.body.audio_clips;
  let responseChildChannels = await reqChildChannels.json();
  let childChannels = responseChildChannels.body.channels;

  return { props: { channel, audioClips, childChannels } };
}
export default Channel;
