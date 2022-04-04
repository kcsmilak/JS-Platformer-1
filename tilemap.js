

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
                rect(x+rx*this.tileWidth,y+ry*this.tileHeight,this.tileWidth,this.tileHeight) //p5
                pop() //p5
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