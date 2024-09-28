//全屏樱花飘落
let stop; // eslint-disable-line no-unused-vars
let img = new Image();
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCOTQ3NzU5QUU1MzgxMUU3QjYyNUM2QzcxQUNCM0IwMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCOTQ3NzU5QkU1MzgxMUU3QjYyNUM2QzcxQUNCM0IwMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI5NDc3NTk4RTUzODExRTdCNjI1QzZDNzFBQ0IzQjAxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI5NDc3NTk5RTUzODExRTdCNjI1QzZDNzFBQ0IzQjAxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/F2xDAAABEFJREFUeNrMmHtol1UYx7e5TRMlC0XCyzTUTGVsGjSNac5Llz+aqaAyNTKdIaUQKAqZEBlaeV9tZJmaoCWk81Le76xSxFul6ULFSaKZSjqv6/Xz0Pel48/3/W2+P1s+8OGc97znPO/zO+c5z3POL9nzvKQHSVKSHjBJTXB8OmyEldAeDsJwGKV6rRt0A/bDTKdtT1Rj7seS7YVy6AOXYQpMgANQ7/8wqAjmwkA4C4/BVnEtisLkBHZZD2gOFbDNaR8m41rA57U5QzdhCfSHHLgEI+AkrIcGkbTaDAUwEXpCFnQL6WN09f6Rg3AaDuj5tThjWsBT0B3eiX0fNqgKVsI6KNeHZ8f0aeaUf3n/Sj+1PwFpTv934RWYB8fgC/W/49tBS1ao5WgCuyENesE4p88GLc14OA0d1P6qYtJYOKLdlqZ3k+FZeEhOf0Hts+ItmU3lNVlu5Q64DtlwHJ5RP19uOGNNWqp+1OlTDxqo/hyUwi+aeV/6hi3ZYvgehsJHzoD34aRK6zcLfoD+ei5Qvxl67gKr4D09m7/cgvmOzi+hM3ynbwYaVEfKSuSk5qxjoUJKSgP8baTeVamcHdBnumPIJ/LPKzI6D1L8vrGpowoegSylgzOQAc30/iXYBG9DHlyBRfC3Yo75yVJ4UX73tXLbmJhQUwxrYRC0gy3VbfskbUmT87AAOioUXHB+7ZvQCD7T87fwpHzCFQsDTWCSZt7kw6DvxjPI/CM/oL2O86GdUOndLbudepcAHebcA+/VoHjsgkL43QuXwbAdGioYWuz5CTLi6Y5qkM+PIcZUBkR+XybH0xk1l02T46eHvLfglwlzoDF8pSRsR5XFUXKZkQltQt6ZXIVDITN0Dk6pnh0w3jZCzr0u2UTHQd9SzsqQX/hSKMO36blMuczdZWcgVzr7Kj+aLKqpQb1gGTyv7eonwZsqL8I4WAujNSZH74Y5OtbLYN/P/lS5EcbACwrA46szKFfh/A9Yro9ckrKfA/oPiVmuoF/upoypinH2w35Tmgo1aKGmvw987ChZooDop4VuUmy5qC7MVb/VWloLgnOc806mUsvqmBg2QDq3hhmU7wQ6M+BX1bOUwQtisr0X4+iZqhc771s72f5l5cVTTn40GRG27UuhRDmtQvnJrjRPQ1sn55Sp3KXyYZWtVe5QeR2u6kZiMkTnJNv6C9W2BhbE2/b1dRb6Rs5dphmyeqr6pDpnmFRnJs0v2qu9syK0r7dIJwdz5BMwTWPqu98Pu3WY9SugElrB/JAwZgf545ohy/yeTgu9YXPImFzoBCegAIbWNDBWR55+4WYl0PPKXxPU/noUvYlcpZvCJFiu+/2j8o1suAiP389rUE3xA+I+OAxr9PxGVJ3JCf4/tF+XQrudfArTtTs/gDaRrtMJzlCSjhOu2C5Kd8/JtTlDJsdgp+7yR3W17ql4U6t/NvwncluAAQCJCl5J+iCYMwAAAABJRU5ErkJggg==";

function Sakura(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
}

Sakura.prototype.draw = function (cxt) {
    cxt.save();
    //这个数值是花瓣大小,电脑端网页 40 效果最好
    let xc = 40 * this.s;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, xc, xc)
    cxt.restore();
}

Sakura.prototype.update = function () {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth ||
        this.x < 0 ||
        this.y > window.innerHeight ||
        this.y < 0
    ) {
        this.r = getRandom('fnr');
        if (Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}

let SakuraList;
SakuraList = function () {
    this.list = [];
}
SakuraList.prototype.push = function (sakura) {
    this.list.push(sakura);
}
SakuraList.prototype.update = function () {
    let i = 0, len = this.list.length;
    for (; i < len; i++) {
        this.list[i].update();
    }
}
SakuraList.prototype.draw = function (cxt) {
    let i = 0, len = this.list.length;
    for (; i < len; i++) {
        this.list[i].draw(cxt);
    }
}
SakuraList.prototype.get = function (i) {
    return this.list[i];
}
SakuraList.prototype.size = function () {
    return this.list.length;
}

function getRandom(option) {
    let ret, random;
    switch (option) {
        case 'x':
            ret = Math.random() * window.innerWidth;
            break;
        case 'y':
            ret = Math.random() * window.innerHeight;
            break;
        case 's':
            ret = Math.random();
            break;
        case 'r':
            ret = Math.random() * 6;
            break;
        case 'fnx':
            random = -0.5 + Math.random();
            ret = function (x) {
                return x + 0.5 * random - 1.7;
            };
            break;
        case 'fny':
            random = 1.5 + Math.random() * 0.7
            ret = function (x, y) {
                return y + random;
            };
            break;
        case 'fnr':
            random = Math.random() * 0.03;
            ret = function (r) {
                return r + random;
            };
            break;
    }
    return ret;
}

export function startSakura() {
    console.log('开始下雪');
	stopp()
    let requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    let canvas = document.createElement('canvas'), cxt;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;z-index:9999;');
    canvas.setAttribute('id', 'canvas_sakura');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    let sakuraList = new SakuraList();
    for (let i = 0; i < 50; i++) {
        let sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s');
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        sakura = new Sakura(randomX, randomY, randomS, randomR, {
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        sakura.draw(cxt);
        sakuraList.push(sakura);
    }
    stop = requestAnimationFrame(function reverse() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(reverse);
    })
}


window.onresize = function () {
    let canvasSnow = document.getElementById('canvas_sakura');
    canvasSnow.width = window.innerWidth;
    canvasSnow.height = window.innerHeight;
}

// img.onload = function () {
//     startSakura();
// }

export function stopp() {
    let child = document.getElementById("canvas_sakura");
    if (child) {
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
    }
}
