import { GameTemplate } from "./GameTemplate.js"
import { Mode, MovableGameObject, GameObject } from "../GameObject.js";
import { FpsControl } from "../FpsControl.js";

export class FallingStones extends GameTemplate {

    static get NAME()
    {
        return "FallingStones";
    }

    start()
    {
        console.log("Starte FallingStones...");
        this.gameOver=false;
        this.player = new MovableGameObject(200, 450, 50, 50, "#6bd26b", 0, 0);
        this.bullets = [];
        this.stones = [];
        this.bullet_timer = 0;

        this.points = 0;
        this.life = 5;
    }

    static get MODES() {
        return [
            {
                NAME:"easy", 
                parameters: {
                    "stone_speed" : 3,
                    "bullet_time_diff" : 300,
                    "diff_intensifies" : 0.05
                },
            },{
                NAME: "medium", 
                parameters: {
                    "stone_speed" : 5,
                    "bullet_time_diff" : 400,
                    "diff_intensifies" : 0.1
                },
            },{
                NAME: "hard", 
                parameters: {
                    "stone_speed" : 7,
                    "bullet_time_diff" : 400,
                    "diff_intensifies" : 0.2
                },
            },
        ];
    }

    bindControls()
    {
        this.inputBinding = {
            "left" : this.left.bind(this),
            "right" : this.right.bind(this),
            "up" : this.create_bullet.bind(this)
        };
    }

    left(bool)
    {
        this.player.vx = -bool * 5;
    }

    right(bool)
    {
        this.player.vx = bool * 5;
    }

    collision_detection()
    {
        for(let stone of this.stones)
        {
            if(this.bullets.length === 0)
            {
                break;
            }

            for(let bullet of this.bullets)
            {
                //wenn das Projektil unterhalb des Steins ist
                //sind auch alle folgenden Projektile drunter
                if(bullet.y > stone.y + 100)
                {
                    break;
                }

                if(GameObject.rectangleCollision(stone, bullet))
                {
                    this.bullets.splice(this.bullets.indexOf(bullet), 1);
                    this.stones.splice(this.stones.indexOf(stone), 1);
                    this.points++;
                    break;
                }
            }
        }
    }

    create_bullet(bool)
    {
        if(!bool || Date.now() - this.bullet_timer < this.bullet_time_diff) return;

        let x = this.player.x + this.player.width/2 - 5;
        let y = this.player.y - 10;
        this.bullets.push(new MovableGameObject(x, y, 10, 10, "#6bd26b", 0, -10));
        this.bullet_timer = Date.now();
    }

    update_bullets(ctx)
    {
        for(let bullet of this.bullets)
        {
            bullet.update(ctx);
        }

        //es muss nur das oberste Projektil überprüft werden
        if(this.bullets.length > 0 && this.bullets[0].y + 10 < 0)
        {
            this.bullets.shift();
        }
    }

    update_stones(ctx)
    {
        for(let stone of this.stones)
        {
            stone.update(ctx);
        }

        if(this.stones.length > 0 && this.stones[0].y - 100 > ctx.canvas.height)
        {
            this.stones.shift();
            
            if(!(--this.life))
            {
                this.gameOver = true;

                if(this.gameOverText.length < 3)
                {
                    this.gameOverText.push("Points: " + this.points);
                }
                else{
                    this.gameOverText[2] = "Points: " + this.points;
                }
            }
        }

        if(this.stones.length === 0 || this.stones[this.stones.length - 1].y > 200)
        {
            let stone = new MovableGameObject(Math.random() * (ctx.canvas.width - 50),
            -100, 50, 100, "#6bd26b", 0, this.stone_speed + this.points * this.diff_intensifies);
            this.stones.push(stone);
        }
    }

    update(ctx)
    {
        this.player.update(ctx);
        this.update_bullets(ctx);
        this.update_stones(ctx);

        this.collision_detection();
    }

    draw_bullets(ctx)
    {
        for(let bullet of this.bullets)
        {
            bullet.draw(ctx);
        }
    }

    draw_stones(ctx)
    {
        for(let stone of this.stones)
        {
            stone.draw(ctx);
        }
    }

    draw(ctx)
    {
        this.player.draw(ctx);
        this.draw_bullets(ctx);
        this.draw_stones(ctx);

        ctx.font = "40px Calibri";
        ctx.fillStyle = "green";
        ctx.fillText(this.life, this.player.x + 12, this.player.y + 38, 50, 50);
    }

}
