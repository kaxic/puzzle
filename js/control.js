class Control {
  constructor() {
    //初期設定
    for(let i = 0;i < SIZE*SIZE;i++){
      imageName[i] = "board" + i;
    } 
    for (let key of imageName) {
      image[key] = new Image();
      image[key].src = "png/" + key + ".png";
    }


    this.reset();
  }

  //初期化関数
  reset() {
    //オブジェクト達
    this.p = new Puzzle();
  }

  //ゲームクリア判定&処理
  gameClear() {
    if(this.p.isGameClear()){
      clicked = false;
      ctx.font = "50pt 'Impact'";
      ctx.fillStyle = "black";
      ctx.fillText("Congratulation!!",0,SIZE*H+70);
      ctx.fillText("Push 'R' key to restart !",0,SIZE*H+130);
      if(key['r']){
        this.reset();
      }
      return true;
    }
    return false;
  }


  gameLoop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cvs.width,cvs.height);
    this.gameClear();
    this.p.draw();
    this.p.update();
  }
}
