//オンロードでゲーム開始
window.onload = function () {
  let control = new Control();

  setInterval(control.gameLoop.bind(control), GAME_SPEED);
};
