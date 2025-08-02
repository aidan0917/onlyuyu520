<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

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
    song.currentTime = progress.value;
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
</script>