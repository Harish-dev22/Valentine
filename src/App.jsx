import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! Initial Music (plays on page load)
import initialMusic from "./assets/AudioTracks/Tamil/Yes/Enna_solla.mp3";

//! yes - Music Importing
// import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
// import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
// import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
// import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";
import yesmusic5 from "./assets/AudioTracks/Tamil/Yes/PookalBgam.mp3";
import yesmusic6 from "./assets/AudioTracks/Tamil/Yes/Maruvarthai.mp3";
import popupOkMusic from "./assets/AudioTracks/Tamil/Yes/ithu_pothum.mp3";

//! no - Music Importing
// import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
// import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
// import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
// import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
// import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";
import nomusic6 from "./assets/AudioTracks/Tamil/Ennai_kollathey.mp3";
import nomusic7 from "./assets/AudioTracks/Tamil/YendiEnna.mp3";
import nomusic8 from "./assets/AudioTracks/Tamil/YeanEnnai.mp3";
import nomusic9 from "./assets/AudioTracks/Tamil/YedhoOndru.mp3";
import nomusic10 from "./assets/AudioTracks/Tamil/Kanave.mp3";
import nomusic11 from "./assets/AudioTracks/Tamil/PonePo.mp3";
import nomusic12 from "./assets/AudioTracks/Tamil/Vaadipulla.mp3";


const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic5,yesmusic6];
const NoMusic = [nomusic6, nomusic7, nomusic8, nomusic9, nomusic10, nomusic11, nomusic12];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); // Tracks the currently playing song
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Track the current gif index
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);
  const [celebrationHearts, setCelebrationHearts] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const gifRef = useRef(null); // Ref to ensure gif plays infinitely
  const initialAudioRef = useRef(null); // Ref for initial music
  const currentAudioRef = useRef(null); // Ref to track current audio for callbacks
  const yesButtonSize = noCount * 16 + 16;

  // Show welcome popup and play initial music after user interaction
  useEffect(() => {
    const audio = new Audio(initialMusic);
    audio.loop = true;
    initialAudioRef.current = audio;

    Swal.fire({
      title: "💕 Welcome My Love 💕",
      html: "I have something special for you...<br/>Are you ready to see it? 🥰",
      confirmButtonText: "Yes, Show Me! ❤️",
      confirmButtonColor: "#e91e63",
      width: 500,
      padding: "2em",
      color: "#716add",
      background: `#fff url(${swalbg})`,
      backdrop: `
        rgba(0,0,123,0.4)
        url(${loveu})
        right
        no-repeat
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      // Play music after user clicks the popup
      initialAudioRef.current.play();
      setCurrentAudio(initialAudioRef.current);
    });

    return () => {
      if (initialAudioRef.current) {
        initialAudioRef.current.pause();
        initialAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const [floatingGifs, setFloatingGifs] = useState([]); // Array to store active floating GIFs
  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15; // Minimum distance in 'vw' or 'vh'
  
    do {
      position = {
        top: `${Math.random() * 90}vh`, // Keep within 90% of viewport height
        left: `${Math.random() * 90}vw`, // Keep within 90% of viewport width
      };
  
      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);
  
    return position;
  };
  
  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseLeave = () => {
    setFloatingGifs([]); // floating GIFs on mouse leave
  };

  // This ensures the "Yes" gif keeps restarting and playing infinitely
  useEffect(() => {
    if (gifRef.current && yesPressed && noCount>3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  // Use effect to change the Yes gif every 5 seconds
  useEffect(() => {
    if (yesPressed && noCount>3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000); // Change gif every 5 seconds

      // Clear the interval
      return () => clearInterval(intervalId);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset gif to ensure it loops infinitely
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length; // Start cycling through NoGifs
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    // Play next song on every click, cycling through all songs
    const nextSongIndex = (nextCount - 1) % NoMusic.length;
    playMusic(NoMusic[nextSongIndex], NoMusic);
  };
  
  const handleYesClick = () => {
    if(!popupShown){ // Only for Swal Fire Popup
      setYesPressed(true);
      playMusic(YesMusic[0], YesMusic); // Play YesMusic on first Yes click
    }
    if(noCount>3){
      setYesPressed(true);
      playMusic(YesMusic[0], YesMusic); // Play the first "Yes" music by default
    }
  };
  
  const playMusic = (url, musicArray) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    if (currentAudio) {
      currentAudio.pause(); // Stop the currently playing song
      currentAudio.currentTime = 0; // Reset to the start
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    currentAudioRef.current = audio; // Set the ref
    setCurrentAudio(audio); // Set the new audio as the current one
    audio.addEventListener('ended', () => {
      const currentIndex = musicArray.indexOf(url);
      const nextIndex = (currentIndex + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray); // Play the next song in the correct array
    });
    audio.play();
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const getNoButtonText = () => {

    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "U Have a heart!💕",
      "Don't be so cold!",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "But... why? 😢",
      "Please, pretty please? 💖",
      "I can't take this! 😫",
      "Are you sure you want to do this to me? 😢",
      "You're gonna hurt my feelings! 😥",
      "I need you to reconsider, like now! 😓",
      "I believe in you, don't disappoint me! 💔",
      "My heart says yes, what about yours? ❤️",
      "Don't leave me hanging! 😬",
      "Plsss? :( You're breaking my heart 💔",
    ];
    
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "I love you so much!! ❤️ You are my everything, my joy, my forever. Every moment with you is a memory I’ll cherish forever, and my heart beats only for you.</br> Will you be the love of my life forever?",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        width: 700,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.2)
          url(${loveu})
          right
          no-repeat
        `,
      }).then(() => {
        // Stop any currently playing audio first using ref
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
        }
        if (initialAudioRef.current) {
          initialAudioRef.current.pause();
          initialAudioRef.current.currentTime = 0;
        }
        
        // Play ithu_pothum.mp3 after user clicks OK
        const popupAudio = new Audio(popupOkMusic);
        popupAudio.loop = true;
        currentAudioRef.current = popupAudio;
        setCurrentAudio(popupAudio);
        popupAudio.play();

        // Trigger heart celebration with 500 hearts and "I love you" text
        const hearts = [];
        const loveTexts = ['❤️', '💕', '💖', '💗', '💓', '💝', 'I Love You', 'Love You', '♥️', '😍', '🥰'];
        for (let i = 0; i < 500; i++) {
          hearts.push({
            id: `celebration-heart-${i}`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 4 + 2}s`,
            size: `${Math.random() * 30 + 15}px`,
            content: loveTexts[Math.floor(Math.random() * loveTexts.length)],
          });
        }
        setCelebrationHearts(hearts);
        // Clear hearts after 8 seconds and show locked screen
        setTimeout(() => {
          setCelebrationHearts([]);
          setIsLocked(true);
        }, 8000);
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);
  
  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "I love you so much!! ❤️ You are my everything, my joy, my forever. Every moment with you is a memory I’ll cherish forever, and my heart beats only for you.</br> Will you be the love of my life forever?",
        width: 800,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.7)
          url(${purposerose})
          right
          no-repeat
        `,
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "My love for you is endless, like the stars in the sky—shining for you every night, even if you don’t always notice. 🌟 I’ll wait patiently, proving every day that you’re my everything. ❤️ Please press ‘Yes’ and let’s make this a forever story. 🥰✨<br/>'True love never gives up; it grows stronger with time.'",
        width: 850,
        padding: "2em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0, 104, 123, 0.7)
          url(${nogif1})
          right
          no-repeat
        `,
      });
    }
  }, [noCount]);

  return (
    <>
      {/* Celebration Hearts */}
      {celebrationHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: heart.left,
            top: '-50px',
            fontSize: heart.size,
            animation: `fall ${heart.animationDuration} ease-in forwards`,
            animationDelay: heart.animationDelay,
          }}
        >
          {heart.content}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Romantic Locked Screen */}
      {isLocked && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 overflow-hidden">
          {/* Floating hearts background */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`bg-heart-${i}`}
              className="absolute text-white opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 40 + 20}px`,
                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ❤️
            </div>
          ))}
          
          {/* Lock icon */}
          <div className="text-8xl mb-6" style={{ animation: 'pulse-heart 1.5s ease-in-out infinite' }}>
            🔒❤️
          </div>
          
          {/* Main message */}
          <h1 
            className="text-4xl md:text-6xl font-bold text-white text-center mb-4 px-4"
            style={{ fontFamily: "Charm, serif", textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            You're Locked in My Heart Forever
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white text-center mb-6 px-4 opacity-90"
            style={{ fontFamily: "Beau Rivage, serif" }}
          >
            No escape... because my love for you is eternal 💕
          </p>
          
          <div className="text-white text-center text-lg opacity-80 mt-8">
            <p>💝 You said YES 💝</p>
            <p className="mt-2 text-2xl">Now you're mine forever! 🥰</p>
          </div>

          {/* Decorative hearts */}
          <div className="absolute bottom-10 flex gap-4 text-4xl">
            <span style={{ animation: 'pulse-heart 1s ease-in-out infinite' }}>💖</span>
            <span style={{ animation: 'pulse-heart 1s ease-in-out infinite 0.2s' }}>💗</span>
            <span style={{ animation: 'pulse-heart 1s ease-in-out infinite 0.4s' }}>💓</span>
            <span style={{ animation: 'pulse-heart 1s ease-in-out infinite 0.6s' }}>💕</span>
            <span style={{ animation: 'pulse-heart 1s ease-in-out infinite 0.8s' }}>💖</span>
          </div>

          {/* Mute button still accessible */}
          <button
            className="fixed bottom-10 right-10 bg-white/30 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm"
            onClick={toggleMute}
          >
            {isMuted ? <BsVolumeMuteFill size={26} color="white" /> : <BsVolumeUpFill size={26} color="white" />}
          </button>
        </div>
      )}

      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
        {/* <Spline scene="https://prod.spline.design/ZU2qkrU9Eyt1PHBx/scene.splinecode" /> */}
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
        {yesPressed && noCount>3 ? (
          <>
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div className="text-4xl md:text-6xl font-bold my-2" style={{ fontFamily: "Charm, serif", fontWeight: "700", fontStyle: "normal" }}>I Love You !!!</div>
            <div  className="text-4xl md:text-4xl font-bold my-1" style={{ fontFamily: "Beau Rivage, serif", fontWeight: "500", fontStyle: "normal" }}> You’re the love of my life. </div> 
            <WordMareque />
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-10 md:left-15 left-6 md:w-40 w-28"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[230px] rounded-lg"
              src={Lovegif}
              alt="Love Animation"
            />
            <h1 className="text-4xl md:text-6xl my-4 text-center">
              Will you be my Valentine?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-12 h-12 animate-bounce"
                style={gif.style}
              />
            ))}
          </>
        )}
        <button
          className="fixed bottom-10 right-10 bg-gray-200 p-1 mb-2 rounded-full hover:bg-gray-300"
          onClick={toggleMute}
        >
          {isMuted ? <BsVolumeMuteFill size={26} /> : <BsVolumeUpFill size={26} />}
        </button>
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <a
      className="fixed bottom-2 right-2 backdrop-blur-md opacity-80 hover:opacity-95 border p-1 rounded border-rose-300"
      href="https://github.com/UjjwalSaini07"
      target="_blank"
      rel="noopener noreferrer"
    >
      Made with{" "}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      {" "}by Love
    </a>
  );
};







// ! Pathways-
// https://app.spline.design/file/48a9d880-40c9-4239-bd97-973aae012ee0
// https://app.spline.design/file/72e6aee2-57ed-4698-afa7-430f8ed7bd87
