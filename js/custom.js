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

document.addEventListener("DOMContentLoaded", function () {
   const switchBtn = document.querySelector(".switchBtn");
   const bgMusic = document.querySelector(".bg_music");
   const bgLove = document.querySelector(".bg_love");

   const song = document.getElementById("song");
   const loveAudio = new Audio("song/lovesong.mp3");
   loveAudio.loop = true;

   let isMusicVisible = true;

   switchBtn.addEventListener("click", () => {
      if (isMusicVisible) {
         bgMusic.classList.add("hidden");
         bgLove.classList.remove("hidden");
         song.pause();
         loveAudio.currentTime = 0;
         loveAudio.play();
      } else {
         bgLove.classList.add("hidden");
         bgMusic.classList.remove("hidden");
         loveAudio.pause();
         loveAudio.currentTime = 0;
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