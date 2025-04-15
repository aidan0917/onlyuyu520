$(function () {
    var canvas, gl,
        ratio,
        vertices,
        velocities,
        freqArr,
        cw,
        ch,
        colorLoc,
        thetaArr,
        velThetaArr,
        velRadArr,
        boldRateArr,
        drawType = 0,
        numLines = 40000,
        iconNumLines = 40000,
        contentWidth,
        contentHeight,
        canvasSpace,
        canvas2,
        ctx2,
        ctx,
        maxStars = 1500;
        starsCount = 0,
        stars = [],
        hue = 217;

    var target = [];
    var iconTarget = [];
    var randomTargetXArr = [],
        randomTargetYArr = [];
    var requestAnimationFrameId;
    var coefficient = .4;
    var targetCoefficient = .02;

    function initAnimationScene() {
        //    Get the canvas element
        canvas = document.getElementById("animation-canvas");
        contentWidth = canvas.parentNode.offsetWidth;
        contentHeight = canvas.parentNode.offsetHeight;
        canvas.width = contentWidth;
        canvas.height = contentHeight;
        canvasSpace = document.getElementById("animation-space-canvas");
        canvasSpace.width = contentWidth;
        canvasSpace.height = contentHeight;
        initStarsAnimation();
        startStarsAnimation();
    }

    function timer() {
        if (drawType < 2) {
            drawType += 1;

            if (drawType < 2) {
                setTimeout(timer, 3500);
            } else {
                setTimeout(timer, 3500);
            }
            return;
        }

        if (drawType == 2) {
            canvas.parentNode.className += ' active';
            startStarsAnimation();
            drawIconScene();
        }
    }

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
    }

    var Star = function () {
        this.orbitRadius = random(maxOrbit(contentWidth, contentHeight));
        this.radius = random(60, this.orbitRadius) / 10;
        this.orbitX = contentWidth / 2;
        this.orbitY = contentHeight / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 800000;
        this.alpha = random(2, 10) / 10;
        starsCount++;
        stars[starsCount] = this;
    }

    Star.prototype.draw = function () {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    }

    function starsAnimation() {
        ctx.clearRect(0, 0, contentWidth, contentHeight);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, contentWidth, contentHeight);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        };
        requestAnimationFrame(starsAnimation);
    }

    function initCanvasCachedGradient() {
        canvas2 = document.createElement('canvas');
        var w2 = canvas2.width = 100;
        var h2 = canvas2.height = 100;
        ctx2 = canvas2.getContext("2d");
        var gradientCache = ctx2.createRadialGradient(
            w2 / 2,
            h2 / 2,
            0,
            w2 / 2,
            h2 / 2,
            w2 / 2
        );
        gradientCache.addColorStop(0.025, 'rgba(255, 255, 255, 1)');
        gradientCache.addColorStop(0.1, 'rgba(255, 255, 255, 0.2)');
        gradientCache.addColorStop(0.25, 'rgba(255, 255, 255, 0.07)');
        gradientCache.addColorStop(1, 'transparent');
        ctx2.fillStyle = gradientCache;
        ctx2.beginPath();
        ctx2.arc(w2 / 2, h2 / 2, w2 / 2, 0, Math.PI * 2);
        ctx2.fill();
    }

    function initStarsAnimation() {
        ctx = canvasSpace.getContext('2d');
        for (var i = 0; i < maxStars; i++) {
            new Star();
        }
        initCanvasCachedGradient();
    }

    function startStarsAnimation() {
        starsAnimation();
    }

    function onResizeHandler(event) {
        contentWidth = canvas.parentNode.offsetWidth;
        contentHeight = canvas.parentNode.offsetHeight;
        canvas.width = contentWidth;
        canvas.height = contentHeight;
        canvasSpace.width = contentWidth;
        canvasSpace.height = contentHeight;
    }

    $(function (event, data) {
        initAnimationScene();
    });

});



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