// Define a constant array of tracks
const trackList = [
    {
      title: "Break",
      artist: "Shiek",
      audioSrc: "shiek.mp3",
      albumCoverSrc: "shiek.jpg",
      lyrics: "Lyrics for Track 1..."
    },
    {
      title: "24/7, 365",
      artist: "Elijah Woods",
      audioSrc: "hours.mp3",
      albumCoverSrc: "hour.jpeg",
      lyrics: [
        { time: 0.00, line: "It's been three years and six whole months since I saw your face that night" },
        { time: 0.30, line: "Lyrics for the second line of the song" },
        { time: 1.00, line: "Lyrics for the third line of the song" }
        // Add more lyrics objects as needed
      ]
    },
    {
      title: "True love",
      artist: "SRTW ft.CLOSR",
      audioSrc: "loved.mp3",
      albumCoverSrc: "True.jpeg",
      lyrics: "..."
    },
    {
      title: "My Girl",
      artist: "Oskar Cyms ",
      audioSrc: "days.mp3",
      albumCoverSrc: "girl.jpeg",
      lyrics: "Lyrics for Track 3..."
    },

    // Add more tracks as needed
  ];
  
  // DOM elements
  const audio = document.getElementById("audio");
  const albumCover = document.getElementById("album-cover");
  const songTitle = document.getElementById("song-title");
  const artist = document.getElementById("artist");
  const progressBar = document.getElementById("progress-bar");
  const timestamp = document.getElementById("timestamp");
  const playButton = document.getElementById("play");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const heartIcon = document.getElementById("heart-icon");



  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("liked");
  });
  


  let isDragging = false;

  // Add mousedown event listener to start dragging
  progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateProgress(e);
  });
  
  // Add mousemove event listener to update progress while dragging
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  });
  
  // Add mouseup event listener to stop dragging
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  
  // Function to update progress based on mouse position
  function updateProgress(e) {
    if (!isDragging) return;
  
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = progressBar.offsetWidth;
    const percent = (offsetX / width) * 100;
  
    const seekTime = (percent / 100) * audio.duration;
    audio.currentTime = seekTime;
  }


  
  // Track index
  let currentTrackIndex = 0;
  
  // Function to update the audio player with track details
  function loadTrack(trackIndex) {
    const track = trackList[trackIndex];
    audio.src = track.audioSrc;
    albumCover.src = track.albumCoverSrc;
    songTitle.textContent = track.title;
    artist.textContent = track.artist;
    audio.load();
  }
  
  // Play and pause functionality
  function togglePlay() {
    if (audio.paused) {
      audio.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      audio.pause();
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  
  // Event listener for the play/pause button
  playButton.addEventListener("click", togglePlay);
  
  // Next track functionality
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
    togglePlay();
  }
  
  // Event listener for the next button
  nextButton.addEventListener("click", nextTrack);
  
  // Previous track functionality
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrackIndex);
    togglePlay();
  }
  
  // Event listener for the previous button
  prevButton.addEventListener("click", prevTrack);
  
  // Update progress bar and timestamp as the audio plays
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    const formattedTime = formatTime(currentTime) + " / " + formatTime(duration);
    timestamp.textContent = formattedTime;
  });
  
  // Format time in MM:SS format
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  // Initialize with the first track
  loadTrack(currentTrackIndex);
  
  // Repeat functionality (toggle between repeat and no-repeat)
  const repeatButton = document.getElementById("repeat");
  let isRepeat = false;
  
  repeatButton.addEventListener("click", () => {
    isRepeat = !isRepeat;
    if (isRepeat) {
      repeatButton.classList.add("active");
    } else {
      repeatButton.classList.remove("active");
    }
  });
  
  // Event listener for when the audio ends
  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      nextTrack();
    }
  });
  
  // Volume control
  const volumeIcon = document.getElementById("volume-icon");
  const volumeSlider = document.getElementById("volume-slider");
  
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    updateVolumeIcon();
  });
  
  function updateVolumeIcon() {
    if (audio.volume === 0) {
      volumeIcon.className = "fas fa-volume-mute";
    } else if (audio.volume < 0.5) {
      volumeIcon.className = "fas fa-volume-down";
    } else {
      volumeIcon.className = "fas fa-volume-up";
    }
  }
  

   // Display lyrics
   displayLyrics(currentTime);


// Function to display lyrics based on current time
function displayLyrics(currentTime) {
  const track = trackList[currentTrackIndex];
  const lyricsText = document.getElementById("lyrics-text");
  const lyricsArray = track.lyrics.split("\n"); // Split lyrics into lines if needed

  // Find the corresponding lyrics line for the current time
  let currentLyricsLine = "";
  for (const line of lyricsArray) {
    const lineParts = line.split(" ");
    const lineTime = parseFloat(lineParts[0]);
    if (!isNaN(lineTime) && lineTime <= currentTime) {
      currentLyricsLine = lineParts.slice(1).join(" ");
    }
  }

  // Display the current lyrics line
  lyricsText.textContent = currentLyricsLine || "Lyrics not available";
}




heartIcon.addEventListener("click", () => {
  heartIcon.classList.toggle("liked");
});

