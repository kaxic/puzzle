//スムージング
const SMOOTHING = false;

//ゲームスピード(ms)
const GAME_SPEED = 1000 / 60;

//画面サイズ
const SCREEN_W = 230;
const SCREEN_H = 320;

//キャンバスサイズ
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

//フィールドサイズ
const FIELD_W = SCREEN_W + 0;
const FIELD_H = SCREEN_H + 0;

//情報エリアサイズ
const CAN_INFO_W = 200;
const CAN_INFO_H = CANVAS_H;

//キャンバス
const container = document.getElementById("container");
const cvs = document.createElement("canvas");
cvs.width = CANVAS_W + CAN_INFO_W;
cvs.height = CANVAS_H;
const ctx = cvs.getContext("2d");
ctx.mozimageSmoothingEnabled = SMOOTHING;
ctx.webkitimageSmoothingEnabled = SMOOTHING;
ctx.msimageSmoothingEnabled = SMOOTHING;
ctx.imageSmoothingEnabled = SMOOTHING;
ctx.font = "20px 'Impact'";

container.appendChild(cvs);

//フィールド
const v_cvs = document.createElement("canvas");
v_cvs.width = FIELD_W;
v_cvs.height = FIELD_H;
const v_ctx = v_cvs.getContext("2d");

let clicked = false;
let eX,eY;
cvs.addEventListener("click",function(e){
    clicked = true;
    eX = e.layerX;
    eY = e.layerY;
});

//カメラ
let camera_x = 0;
let camera_y = 0;

//キーボードの状態
let key = [];

//画像データ
let image = [];

//画像索引
let imageName = [];
