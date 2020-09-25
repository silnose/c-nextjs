import 'isomorphic-fetch';
import Link from 'next/link';
import slug from '../../../../utils/slug';
import Layout from '../../../../components/Layout';
const Podcast = ({ audioClip }) => {
  return (
    <>
      <div className='modal'>
        <div className='clip'>
          <nav>
            <Link
              href={`/${slug(audioClip.channel.title)}/${
                audioClip.channel.id
              }`}>
              <a className='close'>
                <b>Go Back</b>
              </a>
            </Link>
          </nav>

          <picture>
            <div
              style={{
                backgroundImage: `url(${
                  audioClip.urls.image ||
                  audioClip.channel.urls.logo_image.original
                })`,
              }}
            />
          </picture>

          <div className='player'>
            <h3>{audioClip.title}</h3>
            <h6>{audioClip.channel.title}</h6>
            <audio controls autoPlay={false}>
              <source src={audioClip.urls.high_mp3} type='audio/mpeg' />
            </audio>
          </div>
        </div>
      </div>

      <style jsx>{`
        nav {
          background: none;
        }
        nav a {
          display: inline-block;
          padding: 15px;
          color: 5e3b8c;
          cursor: pointer;
          text-decoration: none;
          background-color: white;
          margin: 15px;
          border-radius: 5px 25px;
        }
        .clip {
          display: flex;
          height: 100%;
          flex-direction: column;
          background: #8756ca;
          color: white;
        }
        picture {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1;
          flex-direction: column;
          width: auto;
          padding: 10%;
        }
        picture div {
          width: 100%;
          height: 100%;
          background-position: 50% 50%;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .player {
          padding: 30px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        h3 {
          margin: 0;
        }
        h6 {
          margin: 0;
          margin-top: 1em;
        }
        audio {
          margin-top: 2em;
          width: 100%;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query: { idp: id } }) {
  const audioClipID = id;
  let req = await fetch(
    `https://api.audioboom.com/audio_clips/${audioClipID}.mp3`
  );
  let {
    body: { audio_clip },
  } = await req.json();

  return { props: { audioClip: audio_clip } };
}

export default Podcast;
