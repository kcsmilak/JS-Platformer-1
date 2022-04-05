// depends on gamemap and tilemap?

        


class Game {
    constructor() {
        this.player = new Player()
        this.keyboard = new Keyboard()
        this.gameMap = new GameMap()
        this.tiles = []

        this.showTileMap = false
        this.showGameMap = false
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
        if (!this.gameMap.isLoaded()) return
        if (this.tiles.length <= 0) {
            for (let row = 0; row < this.gameMap.mapData.length; row++) {
                for (let col = 0; col < this.gameMap.mapData[0].length; col++) {
                    let partNumber = this.gameMap.mapData[row][col]
                    if (partNumber <= 0) continue
                    this.tiles.push(new Tile(col*16,row*16,partNumber,this.gameMap.tileMap))
                    
                }
            }

        }
        this.player.update(this.tiles)        
    }

    draw() {
        background(51); //p5
        if (!this.gameMap.isLoaded()) return


        this.player.draw()

        this.tiles.forEach(tile => {
            tile.draw()
        })

        //this.gameMap.draw()

        if (this.showTileMap)
            this.gameMap.tileMap.draw(100,100)

        this.gameMap.tileMap.drawSelectedPart(WIDTH-16,0)

    }

    handleMouseClicked(x,y) {
        if (this.showTileMap)
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