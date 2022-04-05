

class Tile extends Rectangle {
    constructor(x, y, partNumber, tileMap) {
        super(x,y,16,16)
        this.partNumber = partNumber
        this.tileMap = tileMap
    }
    
    draw() {
        this.tileMap.drawPart(this.partNumber, this.x, this.y)
    }
}