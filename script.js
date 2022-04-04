
let WIDTH = 600
let HEIGHT = 400


class TileMap {
    constructor() {
        this.tileWidth = 0
        this.tileHeight = 0
        this.tileMapImage = null
        this.selectedPart = 0
        this.simpleCoordinates = true
    }
    
    loadImage(tileMapImage, tileWidth, tileHeight) {
        this.tileMapImage = tileMapImage
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.tilesWide = tileMapImage.width / tileWidth
        this.tilesHigh = tileMapImage.height / tileHeight  
        console.log(`loaded: w:${this.tilesWide} h:${this.tilesHigh}`)
    }
    
    draw(x,y) {
        // draw the tile map
        image(this.tileMapImage,x,y)
        
        // add outline an number to map

        let i = 0
        for(let ry=0;ry<this.tilesHigh;ry+=1) {
            for (let rx=0;rx<this.tilesWide;rx+=1) {
                push()
                fill(255,255,255,0)
                rect(x+rx*this.tileWidth,y+ry*this.tileHeight,this.tileWidth,this.tileHeight)
                pop()
                push()
                textSize(7)
                fill(255,255,255,0)
                strokeWeight(0.2)
                stroke(255)
                if (this.simpleCoordinates)
                    i = rx + ry*100 + 1
                else
                    i++
                text(`${i}`, x+rx*this.tileWidth,y+ry*this.tileHeight + 7)
                pop()
            }
        }
    }
    
    drawPart(partNumber, x, y) {

        if (partNumber <=0) return
        
        let sx = 0
        let sy = 0
        
        if (this.simpleCoordinates) {
            sx = int((partNumber-1) % 100) * this.tileWidth
            sy = int((partNumber-1) / 100) * this.tileHeight
        } else {
            sx = (partNumber % this.tilesWide) * this.tileWidth
            sy = int(partNumber / this.tilesWide) * this.tileHeight
        }
        image(this.tileMapImage, x, y, this.tileWidth, this.tileHeight, sx, sy, this.tileWidth, this.tileHeight)
    }
    
    drawSelectedPart(x,y) {
        this.drawPart(this.selectedPart,x,y)
    }

    handleMouseClicked(x,y) {
        if (x < 0 || y < 0) return
        if (x > this.tileMapImage.width || y > this.tileMapImage.height) return
        //console.log(`clicked in tileMap`)
        let col = int(x/this.tileMapImage.width* this.tilesWide)
        let row = int(y/this.tileMapImage.height* this.tilesHigh)
        
        if (this.simpleCoordinates)
            this.selectedPart = row * 100 + col + 1
        else
            this.selectedPart = row * this.tilesWide + col

        
        console.log(`x:${x} y:${y} w:${this.tileMapImage.width} h:${this.tileMapImage.height} r:${row} c:${col} s:${this.selectedPart}`)
    }
    
    
}

class TileMapSelector {
    constructor(tileMap) {
        this.tileMap = tileMap
    }
    
    draw(x,y) {
        this.tileMap.draw(x,y)
    }
}

class GameMap {
    constructor() {
        this.mapData = []
        this.tileMap = new TileMap()

        this.loaded = false
    }


    loadGameMap() {
        let mapData = this.mapData;

        let platformerKey = 
            '1jbsapypHN5FX6k8K7Zs271bY8QSzSMiLkHFi2667nsU';
        let testKey = 
            '1wVyI5wAqiorXbmbk-pqoiOcMSMfH-7BjIoVFWcSx-38';
        let mapKey = testKey;
        let url = 
            'https://docs.google.com/spreadsheets/d/' + mapKey 
            + '/gviz/tq?tqx=out:csv&sheet=live';
        
        httpGet(url, function(csv) {
            for (let row = 0; row < mapData.length; row++) {
                mapData[row].splice(0, mapData[row].length);
            }
            mapData.splice(0, mapData.length);


            let data = [];

            let rows = csv.split('\n');
            for (let row = 0; row < rows.length; row++) {
                console.log(rows[row])
                let cols = rows[row].split(',');
                let datatopush = [];
                for (let col = 0; col < cols.length; col++) {
                    //console.log(cols[col])
                    
                    let val = int(cols[col].split('"')[1])
                    if (isNaN(val)) continue
                    console.log(val)
                    datatopush.push(val);
                }
                mapData.push(datatopush);
            }
            console.log(mapData);
        });

        loadImage(base64img, tileMapImage => { 
            this.loaded = true
            this.tileMap.loadImage(tileMapImage, 16, 16)
            console.log('loaded')
        })

    }

    draw() {
        // draw gameMap
        if (!this.loaded) return
        let tileSize = 16
        for (let row = 0; row < this.mapData.length; row ++) {
            for (let col = 0; col < this.mapData[row].length; col ++) {
                let tilePart = this.mapData[row][col]
                if (tilePart >= 0) {
                    this.tileMap.drawPart(tilePart,col*tileSize,row*tileSize)
                }
            }
        }        
        
    }

}

class Actor {

    static get MOVEMENT_IDLE() { return 0 }
    static get MOVEMENT_RIGHT() { return 1 }
    static get MOVEMENT_LEFT() { return -1 }

    static get DIRECTION_FACING() { return 0 }
    static get DIRECTION_RIGHT() { return 1 }
    static get DIRECTION_LEFT() { return -1 }
    
    constructor() {
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this.image = null

        this.xspeed = 0
        this.yspeed = 0
        
        this.movement = Actor.MOVEMENT_IDLE
        this.direction = Actor.DIRECTION_RIGHT
        
    }

    animate() {
        
    }

    draw() {
        rect(this.x, this.y, this.width, this.height) //p5
    }
}

class Player extends Actor {

    static get JUMP_BOOST() { return 20 }
    static get GRAVITY() { return 1 }
    static get GRAVITY_MAX() { return 10 }


    constructor() {
        super()

        this.x = 100
        this.y = 100
        this.width = 16
        this.height = 16
        this.speed = 8
        this.jumping = false
        this.airborn = false
    }

    update() {

        // initialize round movement to previous velocity
        let dx = 0
        let dy = this.yspeed
        
        if (Actor.MOVEMENT_RIGHT == this.movement) {
            dx = this.speed
        } else if (Actor.MOVEMENT_LEFT == this.movement) {
            dx = -this.speed
        }

        // check for x boundry conditions
        if (this.x + dx < 0 ) {
            dx = 0 - this.x
        }
        if (this.x + dx + this.width > WIDTH) {
            dx = WIDTH - (this.x + this.width)
        }


        // accelerate yspeed by gravity
        dy += Player.GRAVITY

        // constrain yspeed by terminal velocity
        if (dy > Player.GRAVITY_MAX) {
            this.airborn = true
            dy = Player.GRAVITY_MAX
        }

        // modify y velocity if jumping (and not already in the air)
        if (this.jumping && !this.airborn) {
            dy -= Player.JUMP_BOOST
            this.airborn = true
            console.log("jump")
        }

        // attempt to move by dy and check if hit the ground
        if (this.y + this.height + dy > HEIGHT) {
            dy = (HEIGHT - (this.y + this.height))
            this.yspeed = 0
            this.airborn = false
        } 
        this.yspeed = dy
        
        this.x += dx
        this.y += dy
    



        this.animate()
    }

}

class Keyboard {
    // https://keycode.info/for/Space
    get a() { return keyIsDown(65) } //p5
    get d() { return keyIsDown(68) } //p5
    get s() { return keyIsDown(83) } //p5
    get w() { return keyIsDown(87) } //p5
    get t() { return keyIsDown(84) } //p5

    get space() { return keyIsDown(32) } //p5

}

class Game {
    constructor() {
        this.player = new Player()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()

        this.showTileMap = false
    }

    preload() {
        this.gameMap.loadGameMap()
    }

    processInput() {
        if (this.keyboard.a && ! this.keyboard.d){
            this.player.movement = Player.MOVEMENT_LEFT
        } else if (this.keyboard.d && ! this.keyboard.a) {
            this.player.movement = Player.MOVEMENT_RIGHT
        } else {
            this.player.movement = Player.MOVEMENT_IDLE
        }

        if (this.keyboard.a){
            this.player.direction = Player.DIRECTION_LEFT
        } else if (this.keyboard.d) {
            this.player.direction = Player.DIRECTION_RIGHT
        }
        
        if (this.keyboard.w) {
            this.player.jumping = true
        } else {
            this.player.jumping = false
        }


    }
    
    update() {        
        this.player.update()        
    }

    draw() {
        background(51); //p5

        this.player.draw()

        this.gameMap.draw()

        if (this.showTileMap)
            this.gameMap.tileMap.draw(100,100)        
        
        textSize(32);
        text(this.player.airborn, 10, 30);
    }

    handleMouseClicked(x,y) {
        this.gameMap.tileMap.handleMouseClicked(x-100,y-100)
    }

    handleKeyPressed(keyCode) {
        if (keyCode == 84) {
            console.log(`toggle map ${this.showTileMap}`)
            if (this.showTileMap)
                this.showTileMap = false
            else
                this.showTileMap = true
        }        
    }
}


/**
 * APP
 */

game = new Game()

function preload() { //p5
    game.preload()
}

function mouseClicked(event) { //p5
    console.log(event)
    game.handleMouseClicked(event.x,event.y)
}

function keyPressed(event) { //p5
    console.log(event)
    game.handleKeyPressed(event.keyCode)
}

function mouseDragged(event) { //p5
}

function mouseWheel(event) { //p5
}

function setup() { //p5
    createCanvas(WIDTH, HEIGHT) //p5
}

function draw() { //p5
    game.processInput()
    game.update()
    game.draw()
}