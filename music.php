<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>


<style>
.album-cover {
    width: 90%;
}

.swiper {
    width: 100%;
    padding: 40px 0;
}

.swiper-slide {
    position: relative;
    max-width: 200px;
    aspect-ratio: 1/1;
    border-radius: 10px;
    opacity: 0.4;
}

.swiper-slide img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    -webkit-box-reflect: below -5px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
    pointer-events: none;
    user-select: none;
}

.swiper-slide-active {
    opacity: 1;
    animation: zoom .5s infinite alternate;
}

@keyframes zoom {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.05);
    }
}

/* Music Player */

.music-player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--primary-clr);
    width: 100%;
    padding: 20px 20px 50px;
    border-radius: 20px;
}

.music-player h2 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.6;
    height: 60px
}

.music-player p {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.6;
    margin-top: 0
}

/* Music Player Progress */

#progress {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 7px;
    background: linear-gradient(
      to right, #63c5da var(--progress, 0%), rgba(163, 162, 164, 0) var(--progress, 0%)
    );
    cursor: pointer;
    z-index: 1;
    position: relative;
    border-radius: 10px;
}

.progress-wrapper {
    max-width: 380px;
    background: rgba(163, 162, 164, 0.4);
    margin: 20px 0;
    border-radius: 10px;
    height: 7px;
    display: flex;
    align-items: center;
}

#progress::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    background: rgba(163, 162, 164, 0.9);
    width: 16px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    outline: 4px solid var(--primary-clr);
    box-shadow: 0 6px 10px rgba(5, 36, 28, 0.3);
}

/* Music Player Controls */

.controls {
    display: flex;
    justify-content: center;
    align-items: center;
}

.controls button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    aspect-ratio: 1/1;
    margin: 20px;
    background: rgba(0, 0, 0, 0.4);
    color: var(--primary-clr);
    border-radius: 50%;
    border: 0;
    outline: 0;
    font-size: 1.1rem;
    box-shadow: 0 5px 20px #63c5da;
    transition: all 0.3s linear;
    cursor: unset;
}

.controls button:is(:hover, :focus-visible) {
    transform: scale(0.96);
}

.controls button:nth-child(2) {
    transform: scale(1.3);
    background: #63c5da;
}

.controls button:nth-child(2):is(:hover, :focus-visible) {
    transform: scale(1.25);
}

.emoji-particle {
    position: absolute;
    pointer-events: none;
    animation: emoji-bounce 1.2s ease-out forwards;
    will-change: transform;
    z-index: 999;
    transform: translateY(0);
    opacity: 0;
    pointer-events: none; 
    z-index: -1;
    display: none;
}

@keyframes emoji-bounce {
    0% {
        opacity: 0;
        transform: translateY(0) scale(1);
    }

    30% {
        opacity: 1;
        transform: translateY(-5px) scale(1.2);
    }

    100% {
        opacity: 0;
        transform: translateY(-10px) scale(0.8);
    }
}
</style>

<div class="musicBox">
    <div class="album-cover">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="img/img1.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img2.jpg?v=2" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img3.jpg?v=1" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img4.jpg?v=1" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img5.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img6.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="img/img7.jpg" />
                </div>
            </div>
        </div>
    </div>

    <div class="music-player">
        <h2>Title</h2>
        <p>Song Name</p>

        <audio id="song">
            <source src="song-list/Luke-Bergs-Gold.mp3" type="audio/mpeg" />
        </audio>

        <div class="progress-wrapper" style="position: relative; width: 100%;">
            <input type="range" value="0" id="progress" />
        </div>

        <div class="controls">
            <button class="backward">
                <i class="fa-solid fa-backward"></i>
            </button>
            <button class="play-pause-btn">
                <i class="fa-solid fa-play" id="controlIcon"></i>
            </button>
            <button class="forward">
                <i class="fa-solid fa-forward"></i>
            </button>
        </div>
    </div>
</div>

<script>
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

const songs = [{
        title: "快闪",
        name: "离家出走",
        source: "song/yuyu_song1.mp3",
    },
    {
        title: "念你 在每一个凌晨 旧的歌 新的我🩵...",
        name: "Alicia Keys",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
    },
    {
        title: "𝑫𝒂𝒊𝒍𝒚 ◡̈°·",
        name: "Madrigal",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
    },
    {
        title: "快乐不难 知足就好 今天很好，希望明天也是🤍",
        name: "Daft Punk ft. Julian Casablancas",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Daft-Punk-Instant-Crush.mp3",
    },
    {
        title: "好心情有很多种，好好打扮自己是第一种🙂‍↔️🩷",
        name: "Harry Styles",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
    },

    {
        title: "“尽心尽力就好，日子很难周全所有。”🩵",
        name: "Dua Lipa",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Dua-Lipa-Physical.mp3",
    },
    {
        title: "“ 不听，不问，不看，不期待，好好生活💕 ”",
        name: "Taylor Swift",
        source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Taylor-Swift-Delicate.mp3",
    },
];

let currentSongIndex = 3;

function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;

    song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
    if (!song.paused) {
        progress.value = song.currentTime;

        const ratio = progress.value / progress.max;
        const width = progress.offsetWidth;
        const x = width * ratio;

        if (Math.floor(song.currentTime * 5) % 5 === 0) {
            showEmojisAtProgress(x);
        }
    }
});

song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
    currentSongIndex = (swiper.activeIndex + 1) % songs.length;
    updateSongInfo();
    swiper.slideTo(currentSongIndex);
    playSong();
});

function pauseSong() {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
}

function playSong() {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}

function playPause() {
    if (song.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
    const ratio = progress.value / progress.max;
    const width = progress.offsetWidth;
    const x = width * ratio;
    showEmojisAtProgress(x);
});

progress.addEventListener("change", () => {
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    centeredSlides: true,
    initialSlide: 3,
    slidesPerView: "auto",
    grabCursor: true,
    spaceBetween: 40,
    mousewheel: true,
    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 50,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: ".forward",
        prevEl: ".backward",
    },
});

swiper.on("slideChange", () => {
    currentSongIndex = swiper.activeIndex;
    updateSongInfo();
    playPause();
});

const emojiList = [
    "💖", "💘", "💕", "💓", "❣️", "💗", "❤"
];

function showEmojisAtProgress(x) {
    const wrapper = document.querySelector('.progress-wrapper');
    const count = Math.floor(Math.random() * 2) + 3;

    for (let i = 0; i < count; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-particle';
        emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

        const offsetX = x + (Math.random() * 100 - 50);
        const offsetY = -20 - Math.random() * 20;

        emoji.style.left = `${offsetX}px`;
        emoji.style.top = `${offsetY}px`;

        emoji.style.fontSize = `${15 + Math.random() * 5}px`;
        emoji.style.animationDelay = `${Math.random() * 0.3}s`;

        wrapper.appendChild(emoji);

        setTimeout(() => emoji.remove(), 1200);
    }
}

song.addEventListener("timeupdate", () => {
    if (!song.paused) {
        progress.value = song.currentTime;

        const playedPercentage = (song.currentTime / song.duration) * 100;
        progress.style.setProperty('--progress', `${playedPercentage}%`);

        const ratio = progress.value / progress.max;
        const width = progress.offsetWidth;
        const x = width * ratio;

        if (Math.floor(song.currentTime * 5) % 5 === 0) {
            showEmojisAtProgress(x);
        }
    }
});
</script>