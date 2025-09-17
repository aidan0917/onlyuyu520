// ====== CANDLE ====== //
$(function () {
    const title = $("h1");
    const text = title.text();
    const flame = $('#flame');
    const candle = $('#candle');

    title.empty().addClass("h1_animated");

    [...text].forEach((char, i) => {
        const span = $("<span>").text(char);
        span.css("animation-delay", `${i * 0.3}s`);
        title.append(span);
    });

    const totalTime = text.length * 0.3 + 0.8;

    setTimeout(() => {
        title.addClass("h1_to_header");
        candle.addClass("visible");
        startLoveRain();
    }, totalTime * 1000);

    flame.on("click", function () {
        stopLoveRain()
        flame.removeClass('burn').addClass('puff');
        $('#candle').animate({ 'opacity': '.5' }, 100);
        $(".bg_candle").addClass("zoom_out");
        setTimeout(() => {
            $(".bg_candle").hide();
            $(".bg").addClass("zoom_in_bg");
        }, 1500);
    });
});

// ====== LOVE ====== //
let loveStarted = false;
let loveInterval = null;

function startLoveRain() {
    if (loveStarted) return;
    loveStarted = true;

    const emojiList = [
        "🎉", "🎂", "🎈", "🍰", "🍾", "🧁", "✨",
        "💖", "💘", "💕", "💓", "❣️", "💗", "❤"
    ];

    loveInterval = setInterval(() => {
        const heart = $("<div class='heart'></div>");
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        const size = Math.random() * 8 + 14;
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 6;

        heart.text(randomEmoji);
        heart.css({
            left: `${left}%`,
            fontSize: `${size}px`,
            animationDuration: `${duration}s`,
        });

        $("body").append(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1500);
    }, 300);
}

function stopLoveRain() {
    if (loveInterval) {
        clearInterval(loveInterval);
        loveInterval = null;
        loveStarted = false;
    }

    $(".heart").remove();
}

// ====== CURSOR ====== //
document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('#cursor');
    const cursorCircle = cursor.querySelector('.cursor_circle');

    const mouse = { x: -100, y: -100 };
    const pos = { x: 0, y: 0 };
    const speed = 0.1;

    const updateCoordinates = e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', updateCoordinates);

    function getAngle(diffX, diffY) {
        return Math.atan2(diffY, diffX) * 180 / Math.PI;
    }

    function getSqueeze(diffX, diffY) {
        const distance = Math.sqrt(
            Math.pow(diffX, 2) + Math.pow(diffY, 2)
        );
        const maxSqueeze = 0.15;
        const accelerator = 1500;
        return Math.min(distance / accelerator, maxSqueeze);
    }

    const updateCursor = () => {
        const diffX = Math.round(mouse.x - pos.x);
        const diffY = Math.round(mouse.y - pos.y);

        pos.x += diffX * speed;
        pos.y += diffY * speed;

        const angle = getAngle(diffX, diffY);
        const squeeze = getSqueeze(diffX, diffY);

        const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
        const rotate = 'rotate(' + angle + 'deg)';
        const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

        cursor.style.transform = translate;
        cursorCircle.style.transform = rotate + scale;
    };

    function loop() {
        updateCursor();
        requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('button, #top, .switchBtn, .progress-wrapper, .progress-wrapper input').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursorCircle.classList.remove('active');
        });

        el.addEventListener('mousedown', () => {
            cursorCircle.classList.add('active');
        });
        el.addEventListener('mouseup', () => {
            cursorCircle.classList.remove('active');
        });
    });

    const swiperEls = document.querySelectorAll('.swiper-wrapper, .progress-wrapper, input');
    swiperEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.classList.add('hidden');
        });
        el.addEventListener('mouseleave', () => {
            cursorCircle.classList.remove('hidden');
        });
    });
});

const loveAudio = new Audio("song/lovesong2.mp3");
loveAudio.loop = true;

function stopAllAudio() {
    song.pause();
    loveAudio.pause();
    song.currentTime = 0;
    loveAudio.currentTime = 0;
}

document.addEventListener("DOMContentLoaded", function () {
    const switchBtn = document.querySelector(".switchBtn");
    const bgMusic = document.querySelector(".bg_music");
    const bgLove = document.querySelector(".bg_love");

    const song = document.getElementById("song");

    let isMusicVisible = true;

    switchBtn.addEventListener("click", () => {
        stopAllAudio();
        if (isMusicVisible) {
            bgMusic.classList.add("hidden");
            bgLove.classList.remove("hidden");

            const items = document.querySelectorAll("#spin-container img, #spin-container video");
            items.forEach(item => {
                item.style.transform = "rotateY(0deg) translateZ(0px)";
                item.style.transition = "none";
            });

            document.querySelector('#drag-container').classList.remove('inited');

            setTimeout(() => {
                init();
                document.querySelector('#drag-container').classList.add('inited');
            }, 100);

            loveAudio.play();
            ospin.style.animationPlayState = 'running'; 

        } else {
            bgLove.classList.add("hidden");
            bgMusic.classList.remove("hidden");
            song.play();
        }

        isMusicVisible = !isMusicVisible;
    });

    const progress = document.getElementById("progress");
    if (progress) {
        ['mousedown', 'touchstart', 'pointerdown'].forEach(evt => {
            progress.addEventListener(evt, e => e.stopPropagation());
        });

        ['mousemove', 'touchmove', 'pointermove'].forEach(evt => {
            progress.addEventListener(evt, e => e.stopPropagation());
        });
    }
});

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
    name: "離家出走",
    source: "song/yuyu_song1.mp3",
},
{
    title: "念你 在每一个凌晨 旧的歌 新的我🩵",
    name: "小胡同",
    source: "song/song1.mp3",
},
{
    title: "𝑫𝒂𝒊𝒍𝒚 ◡̈°·",
    name: "最初的溫柔",
    source: "song/song2.mp3",
},
{
    title: "喜歡愛笑的你，心疼不笑的你 -- 妤特助",
    name: "愛你但說不出口",
    source: "song/song4.mp3",
},
{
    title: "快乐不难 知足就好 今天很好，希望明天也是🤍",
    name: "炙愛",
    source: "song/song3.mp3",
},
{
    title: "好心情有很多种，好好打扮自己是第一种🙂‍↔️🩷",
    name: "你為我撐過的傘",
    source: "song/song5.mp3",
},
{
    title: "“尽心尽力就好，日子很难周全所有。”🩵",
    name: "如果愛忘了",
    source: "song/song6.mp3",
},
{
    title: "“ 不听，不问，不看，不期待，好好生活💕”",
    name: "遺憾也值得",
    source: "song/song7.mp3",
},
{
    title: "“ 我们都在改变，何必感慨从前。”",
    name: "心亂如麻",
    source: "song/song8.mp3",
},
{
    title: "“日复一日的生活，也会有新的快乐”☁️🤍",
    name: "最長的電影",
    source: "song/song9.mp3",
},
{
    title: "一个人就好—",
    name: "這麼多年",
    source: "song/song10.mp3",
},
{
    title: "岁月很长,人海茫茫,你别回头,也别将就🐥",
    name: "天空之外",
    source: "song/song11.mp3",
},
{
    title: "深渊有底，人心难测...",
    name: "友情多餘曖昧未夠",
    source: "song/song12.mp3",
},
{
    title: "每一次的日落都是太阳留给天空的温柔⛅️🩵",
    name: "夢一場",
    source: "song/song13.mp3",
},
];

let currentSongIndex = 3;

function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;

    song.addEventListener("loadeddata", () => { });
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

// You can change global variables here:
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 130; // width of images (unit: px)
var imgHeight = 180; // height of images (unit: px)
// ===================== start =======================

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
}

function applyTranform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    // Apply the angle
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// auto spin
if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    ospin.style.animationPlayState = 'paused';
}


// setup events
document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

document.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};