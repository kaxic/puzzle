//キーボードが押された
document.onkeydown = function (e) {
  key[e.key] = true;
};
//キーボードが離された
document.onkeyup = function (e) {
  key[e.key] = false;
};

// MessageEvent の場合
globalThis.addEventListener("message", e => {
  switch (e.data.type) {
    case "keydown": {
      key[e.data.e.key] = true;
      break;
    } case "keyup": {
      key[e.data.e.key] = false;
      break;
    }
  }
});

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//当たり判定
function checkHit(x1, y1, r1, x2, y2, r2) {
  //円同士の当たり判定
  //

  let a = (x1 - x2) >> 8;
  let b = (y1 - y2) >> 8;
  let r = r1 + r2;

  return r * r >= a * a + b * b;
}
