import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
// import VideoFooter from "./VideoFooter";
// import VideoSidebar from "./VideoSidebar";
import useElementOnScreen from "../../components/useElementOnScreen";
import VideoPlayButton from "../VideoPlayButton";
const Video = ({ videoUrl, likes }) => {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const options = {
        root: null,
        rootMargin: "0px 0px 1000px 0px",
        threshold: 0.9,
    };
    const isVisible = useElementOnScreen(options, videoRef);
    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };
    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisible]);

    return (
        <div className="video">
            <video
                className="video_player"
                loop
                playsInline
                preload="true"
                ref={videoRef}
                onClick={onVideoClick}
                src={videoUrl}
            ></video>
            {/* <VideoFooter channel={channel} description={description} song={song} />
      <VideoSidebar likes={likes} messages={messages} shares={shares} /> */}
            {!playing && <VideoPlayButton onVideoClick={onVideoClick} />}
        </div>
    );
};
export default Video;
