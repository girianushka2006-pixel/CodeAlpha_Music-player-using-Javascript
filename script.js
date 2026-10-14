const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        file: "music/song1.mp3"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        file: "music/song2.mp3"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        file: "music/song3.mp3"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");


function loadSong(index) {

    currentSong = index;

    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    audio.src = songs[index].file;

    audio.load();
}


playButton.addEventListener("click", function() {

    if (audio.paused) {

        audio.play();
        playButton.textContent = "⏸";

    } else {

        audio.pause();
        playButton.textContent = "▶";
    }

});


nextButton.addEventListener("click", function() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "⏸";
});


previousButton.addEventListener("click", function() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playButton.textContent = "⏸";
});


audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const progressValue =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressValue;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }

});


audio.addEventListener("loadedmetadata", function() {

    duration.textContent =
        formatTime(audio.duration);

});


progress.addEventListener("input", function() {

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


volume.addEventListener("input", function() {

    audio.volume = volume.value;

});


audio.addEventListener("ended", function() {

    nextButton.click();

});


function selectSong(index) {

    loadSong(index);

    audio.play();

    playButton.textContent = "⏸";
}


function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);

    let secondsRemaining =
        Math.floor(seconds % 60);

    if (secondsRemaining < 10) {
        secondsRemaining = "0" + secondsRemaining;
    }

    return minutes + ":" + secondsRemaining;
}


loadSong(currentSong);