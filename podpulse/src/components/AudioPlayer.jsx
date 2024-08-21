import { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTimeInSeconds = audioRef.current.currentTime;
      const durationInSeconds = audioRef.current.duration;
      setCurrentTime(formatTime(currentTimeInSeconds));
      setDuration(formatTime(durationInSeconds));
      setProgress((currentTimeInSeconds / durationInSeconds) * 100);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      const newVolume = e.target.value;
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handlePlaybackRateChange = (e) => {
    if (audioRef.current) {
      const newRate = parseFloat(e.target.value);
      audioRef.current.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        if (audioElement) {
          audioElement.removeEventListener('timeupdate', handleTimeUpdate);
          audioElement.removeEventListener('ended', () => setIsPlaying(false));
        }
      };
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-sm p-4 z-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className={`bg-oxford-blue text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
              isPlaying ? 'hover:bg-oxford-blue-dark' : 'hover:bg-oxford-blue-lighter'
            }`}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1zM14 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 3.5l11 7-11 7V3.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <div className="bg-gray-300 rounded-full h-2 overflow-hidden">
              <div
                className="bg-orange-500 h-full transition-width duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="w-full mt-2 focus:outline-none"
            />
            <div className="text-gray-600 text-sm flex justify-between">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
            <select
              value={playbackRate}
              onChange={handlePlaybackRateChange}
              className="bg-white border border-gray-300 rounded-md"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src}></audio>
    </div>
  );
};

export default AudioPlayer;
