<style>
#drag-container,
#spin-container {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: auto;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: rotateX(-10deg);
    transform: rotateX(-10deg);
}

#drag-container img,
#drag-container video {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    line-height: 200px;
    font-size: 50px;
    text-align: center;
    -webkit-box-shadow: 0 0 20px #e3a0a0;
    box-shadow: 0 0 20px #e3a0a0;
    -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
}

#drag-container img:hover,
#drag-container video:hover {
    -webkit-box-shadow: 0 0 15px #fffd;
    box-shadow: 0 0 15px #fffd;
    -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
}

#drag-container p {
    font-family: Serif;
    position: absolute;
    top: 100%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%) rotateX(90deg);
    transform: translate(-50%, -50%) rotateX(90deg);
    color: #fff;
    text-align: center;
    font-size: 24px;
}

#ground {
    width: 900px;
    height: 900px;
    position: absolute;
    top: 100%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%) rotateX(90deg);
    transform: translate(-50%, -50%) rotateX(90deg);
    background: -webkit-radial-gradient(center center, farthest-side, #0003, transparent);
}

#music-container {
    position: absolute;
    top: 0;
    left: 0;
}

@-webkit-keyframes spin {
    from {
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }

    to {
        -webkit-transform: rotateY(360deg);
        transform: rotateY(360deg);
    }
}


@-webkit-keyframes spinRevert {
    from {
        -webkit-transform: rotateY(360deg);
        transform: rotateY(360deg);
    }

    to {
        -webkit-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
}

.imgBg {
    position: absolute;
    z-index: 1001;
    width: 100%;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 100vh;
    transform: scale(1.1);
}

.textLove {
    position: absolute;
    z-index: 10;
    left: 5vh;
    top: 0;
    max-height: 500px;
    padding: 20px;
    width: fit-content;
    border-radius: 15px;
    bottom: 0;
    margin: auto;
    color: #f5f5f5;
}
</style>


<marquee direction="up" scrollamount="2" class="textLove">
    我们最初，只是屏幕前的陌生人，<br>
    一句“哈喽”穿过网线，点亮了灵魂的灯。<br>
    从直播间的弹幕，到私下里的寒暄，<br>
    你我之间，悄悄地编织了一段缘分。<br><br>

    谁说虚拟的世界没有真心？<br>
    我却在光影流转中遇见了你——一个知己、一个朋友，<br>
    聊天、陪伴，欢笑声声，<br>
    一点一滴，都慢慢堆叠成了不可替代的温柔。<br><br>

    后来我们见了面，那天阳光正好，<br>
    你笑着向我走来，像风一样轻，像梦一样好。<br>
    我知道，从那一刻开始，我们早已不是网友，<br>
    而是彼此生命里，最真实的依靠。<br><br>

    我会一直陪着你，不论你在高处低谷，<br>
    你的难过我听，你的开心我祝。<br>
    就算风雨再大，也别怕黑夜太长，<br>
    因为我会像灯塔一样，守着你的方向。<br><br>

    只要你需要，我就会在，<br>
    哪怕隔着千山万水，也不会走开。<br>
    你若累了，就靠一靠，<br>
    我愿做你心里最安静的一块港湾，哪怕默默不表。<br><br>

    日子很长，人生很广，<br>
    愿我们这段情谊，穿越岁月，依旧闪光。<br>
    从屏幕到身旁，从心动到心安，<br>
    你放心往前闯，我会永远在你身后，温柔不散。
</marquee>

<div class="imgBg">
    <div id="drag-container">
        <div id="spin-container">
            <img src="img/yu1.jpg" alt="">
            <img src="img/yu2.jpg" alt="">
            <img src="img/yu4.jpg" alt="">
            <img src="img/yu5.jpg" alt="">
            <img src="img/yu6.jpg" alt="">
            <img src="img/yu7.jpg" alt="">
            <img src="img/yu8.jpg" alt="">
            <img src="img/yu9.jpg" alt="">
            <img src="img/yu10.jpg" alt="">
            <img src="img/yu12.jpg" alt="">

            <!-- Text at center of ground -->
            <p>🎂 <br> Happy Birthday Only.Yuyu</p>
        </div>
        <div id="ground"></div>
    </div>
</div>



<script>
// You can change global variables here:
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 130; // width of images (unit: px)
var imgHeight = 180; // height of images (unit: px)
// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

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
}


// setup events
document.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function(e) {
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

    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
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

document.onmousewheel = function(e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};
</script>