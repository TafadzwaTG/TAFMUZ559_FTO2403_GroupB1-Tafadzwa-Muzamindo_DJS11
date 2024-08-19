import { useState, useRef } from "react";

const AudioPlayer = ({ src, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
     
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();

        }
        setIsPlaying(!isPlaying);

    };
    const handleTimeUpdate = () => {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progress);
    };
    return(
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-sm p-4">
            <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font- font-semibold mb-2 text-oxford-blue">{title}</h3>
                <div className="flex items-center space-x-4">
                    <button onClick={togglePlay}
                    className="bg-oxford-blue text-white rounded-full w-12 h-12 flex items-center justify-center">
                        {isPlaying ? '▶️' : '⏯'}
                    </button>
                    <div className="flex-1">
                        <div className="bg-gray-300 rounded-full h-2 overflow-hidden">
                            <div className="bg-orange-500 h-full"
                            style={{ width :`${progress}%`}}>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <audio ref={audioRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)} />
        </div>
    );
};

export default AudioPlayer