const SIZE = 4;
const W = 90;
const H = 90;

class Board{
    constructor(num,x,y){
        this.num = num;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
    }
    draw(){
        let s = "board" + this.num;
        ctx.drawImage(image[s],0,0,120,120,this.x,this.y,W,H);
    }
    update(){
        const SPEED = 5;
        if(this.num == 0){
            this.x = this.targetX;
            this.y = this.targetY;
        }
        if(this.x == this.targetX && this.y == this.targetY){
            return false;
        }
        if(this.x < this.targetX){
            this.x += SPEED;
            if(this.x >= this.targetX){
                this.x = this.targetX
            }
        }
        else if(this.x > this.targetX){
            this.x -= SPEED;
            if(this.x <= this.targetX){
                this.x = this.targetX
            }
        }
        if(this.y < this.targetY){
            this.y += SPEED;
            if(this.y >= this.targetY){
                this.y = this.targetY
            }
        }
        else if(this.y > this.targetY){
            this.y -= SPEED;
            if(this.y <= this.targetY){
                this.y = this.targetY
            }
        }
        clicked = false;
        return true;
    }
    isContain(x,y){
        if(this.x <= x && this.x + W > x && 
            this.y <= y && this.y + H > y){
            return true;
        }
        return false;
    }
}

class Puzzle{
    constructor(){
        while(true){
            this.board = [];
            let arr = [];
            let empty;
            let parity=0;
            for(let y = 0;y < SIZE;y++){
                for(let x = 0;x < SIZE;x++){
                    let i = rand(0,SIZE*SIZE-1);
                    while(arr.indexOf(i) != -1){
                        i = rand(0,SIZE*SIZE-1);
                    }
                    if(i == 0){
                        empty = (SIZE-x)+(SIZE-y);
                    }
                    arr.push(i);
                    this.board.push(new Board(i,x*W,y*H));
                }
            }

            for(let i = 0;i < this.board.length-1;i++){
                if(arr[i] == i + 1)continue;

                for(let j = i + 1;j < this.board.length;j++){
                    if(arr[j] == i + 1){
                        let t = arr[i];
                        arr[i] = arr[j];
                        arr[j] = t;
                        parity++;
                        break;
                    }
                }
            }

            if(empty%2 == parity%2)break;
        }
    }

    draw(){
        for(let i = 0;i < this.board.length;i++){
            this.board[i].draw();
        }
    }

    update(){
        for(let i = 0;i < this.board.length;i++){
            if(this.board[i].update())return;
        }

        if(clicked){
            for(let i = 0;i < this.board.length;i++){
                if(this.board[i].isContain(eX,eY)){
                    let can = this.canMove(i);
                    //console.log([this.board[i],can]);
                    if(can["up"]){
                        this.tmp(i,i-SIZE);
                    }
                    if(can["down"]){
                        this.tmp(i,i+SIZE);
                    }
                    if(can["left"]){
                        this.tmp(i,i-1);
                    }
                    if(can["right"]){
                        this.tmp(i,i+1);
                    }
                    break;
                }
            }

            clicked = false;
        }
    }

    tmp(i,j){
        let bi = this.board[i];
        let bj = this.board[j];

        bi.targetX = bj.x;
        bi.targetY = bj.y;
        bj.targetX = bi.x;
        bj.targetY = bi.y;
        this.board[i] = bj;
        this.board[j] = bi;

    }

    targetTo(i,j){
        let target = this.board[j];
        this.board[i].targetX = target.x;
        this.board[i].targetY = target.y;
    }

    canMove(i){
        let board = this.board;
        let can = {"up":false,"down":false,"left":false,"right":false};
        
        if(i%SIZE - 1 >= 0){
            if(board[i-1].num == 0)can["left"] = true;
        }
        if(i%SIZE + 1 < SIZE){
            if(board[i+1].num == 0)can["right"] = true;
        }
        if(i/SIZE - 1 >= 0){
            if(board[i-SIZE].num == 0)can["up"] = true;
        }
        if(i/SIZE + 1 < SIZE){
            if(board[i+SIZE].num == 0)can["down"] = true;
        }
        console.log(can);

        return can;
    }

    isGameClear(){
        for(let i = 0;i < this.board.length;i++){
            if(this.board[i].update())return false;
        }
        for(let i = 0;i < this.board.length-1;i++){
            if(this.board[i].num != i + 1)return false;
        }
        return true;
    }
}