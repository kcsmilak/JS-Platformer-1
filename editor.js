// file:///home/chronos/u-2c999305eb90d7e16f697c1bf2aa0ab4915c9e95/MyFiles/src/editor/index.html

//https://www.base64-image.de/

/**
 * CLASSES
 */

class TileMap {
    constructor() {
        this.tileWidth = 0
        this.tileHeight = 0
        this.tileMapImage = null
        this.selectedPart = 0
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
                text(`${i++}`, x+rx*this.tileWidth,y+ry*this.tileHeight + 7)
                pop()
            }
        }
    }
    
    drawPart(partNumber, x, y) {
        let sx = (partNumber % this.tilesWide) * this.tileWidth
        let sy = int(partNumber / this.tilesWide) * this.tileHeight
        
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
    
    defaultGameMapData = [
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1, 1, 1, 0, 0, 0, 0,-1],
        [-1, 0, 0, 0, 0, 0, 0,-1],
        [-1, 0, 0, 0, 0, 0, 0,-1],
        [-1, 0, 0, 0, 0, 0, 0,-1],
        [-1, 0, 0, 0, 0, 0, 0,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1]]

    constructor() {
        this.mapData = this.defaultGameMapData
        this.tileMap = null
        this.tileSize = 16
        this.zoom = 1
        this.width = this.tileSize * this.mapData[0].length
        this.height = this.tileSize * this.mapData.length

    }
    
    setTileMap(tileMap) {
        this.tileMap = tileMap
    }

    draw(x,y) {
        for (let row = 0; row < this.mapData.length; row ++) {
            for (let col = 0; col < this.mapData[row].length; col ++) {
                let tilePart = this.mapData[row][col]
                if (tilePart >= 0) {
                    push()
                    //scale(this.zoom)
                    this.tileMap.drawPart(tilePart,x+col*this.tileSize,y+row*this.tileSize)
                    pop()
                }
                push()
                fill(255,255,255,0)
                rect(x+col*this.tileSize,y+row*this.tileSize,this.tileSize,this.tileSize)
                pop()
            }
        }
    }

    clickInRange(x,y) {
        if (x < 0 || y < 0) return false
        if (x > this.width || y > this.height) return false
        return true
    }


    handleMouseClicked(x,y, selectedPart) {
        if (!this.clickInRange(x,y)) return
        
        let col = int(x/this.width*this.mapData[0].length)
        let row = int(y/this.height*this.mapData.length)
        console.log(`x:${x} y:${y} w:${this.width} h:${this.height} r:${row} c:${col} `)        
        this.mapData[row][col] = selectedPart

    }
}


class Game {
    constructor() {
        this.loaded = false
        this.tileMap = new TileMap()
        this.tileMapSelector = new TileMapSelector(this.tileMap)
        this.gameMap = new GameMap()
        this.gameMap.setTileMap(this.tileMap)
        
        this.tileMapX = 200
        this.tileMapY = 0
        
        this.gameMapX = 100
        this.gameMapY = 100
        
        this.showTileMap = false
    }
    
    preload() {

    }
    
    update() {
    }
    
    draw() {
        background(50);

        if (this.loaded) {

            // draw tileMap
            if (this.showTileMap)
                this.tileMap.draw(this.tileMapX,this.tileMapY)
            
            this.tileMap.drawSelectedPart(0,0)        
            
            // draw gameMap
            this.gameMap.draw(this.gameMapX,this.gameMapY)
        }
    }
    
    handleMouseClicked(x,y) {
        console.log(`clicked x:${x} y:${y} tmx:${this.tileMapX} tmy:${this.tileMapY}`)

        if (this.showTileMap)
            this.tileMap.handleMouseClicked(x - this.tileMapX, y - this.tileMapY)
        
        this.gameMap.handleMouseClicked(x - this.gameMapX,y - this.gameMapY, this.tileMap.selectedPart)
    }
    
    handleKeyPressed(key, keyCode) {
        console.log(key)
        if (key === 's') {
            this.showTileMap = true
        }
        else if (key === 'h') {
            this.showTileMap = false
        }
    }
    
    handleZoom(value) {
        this.gameMap.zoom += value/24/100
    }
                
}

/**
 * APP
 */

let game = new Game()

function preload() {
    tileMapImage = loadImage(base64img, function() { 
        game.loaded = true
        game.tileMap.loadImage(tileMapImage, 16, 16)
        console.log('loaded')
    })
}

function mouseClicked(event) {
    game.handleMouseClicked(event.x, event.y)         
}

function keyPressed() {
    game.handleKeyPressed(key, keyCode)
}

function mouseDragged(event) {
    let x = event.x
    let y = event.y
    let movementX = event.movementX
    let movementY = event.movementY
    
    if (game.gameMap.clickInRange(x - game.gameMapX,y - game.gameMapY)) {
        console.log('scroll')
        game.gameMapX += movementX
        game.gameMapY += movementY
    }
}

function mouseWheel(event) {
    //console.log(event);
    //game.handleZoom(event.delta)
}

function setup() {
    createCanvas(600, 400)
}

function update() {
    game.update()
}

function draw() {
    game.draw()
}