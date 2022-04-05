
let WIDTH = 600
let HEIGHT = 400


scriptkey = 'AKfycbwTh4x8aWvBrpyPae4T6OZPmcv1G0lXiSn8ll_xBHqeYlq8qvDvGHdeAOZpnZRg1CLy2g'
let url = 'https://script.google.com/macros/s/' + scriptkey + '/exec?name=Test';

let modifier = 1;


function handleMouseClicked(x,y) {

    if (game.showTileMap) return
    
    let val = game.gameMap.tileMap.selectedPart


    //console.log(val)

    let rows = game.gameMap.mapData.length
    let cols = game.gameMap.mapData[0].length

    let tileSize = 16

    let mapWidth = tileSize * cols
    let mapHeight = tileSize * rows

    if (x < 0 || x > mapWidth) return
    if (y < 0 || y > mapHeight) return
    
    
    let col = int((x / ( tileSize * cols) ) * cols)
    let row = int((y / ( tileSize * rows) ) * rows)

    let cur = game.gameMap.mapData[row][col] 
    game.gameMap.mapData[row][col] = val
    let set = game.gameMap.mapData[row][col] 

    console.log(`row:${row} col:${col} x:${x} y:${y} rows:${rows} cols:${cols} cur:${cur} val:${val} set:${set}`)

   
    let postData = { x: col, y: row, val: val };
    console.log(postData)
    postData = JSON.stringify(postData)

    $.post( url, { postData}, function( data ) {}, "json");
        
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

    handleMouseClicked(event.x, event.y)

    // prevent default
    return false;    
}

function mousePressed() { //p5
    //ox = mouseX - rect1.x
    //oy = mouseY - rect1.y
}

function keyPressed(event) { //p5
    console.log(event)
    game.handleKeyPressed(event.keyCode)
}

function mouseDragged(event) { //p5
    //rect1.x = mouseX - ox
    //rect1.y = mouseY - oy
}

function mouseWheel(event) { //p5

}

function setup() { //p5
    createCanvas(WIDTH, HEIGHT) //p5
}

//rect1 = new Rectangle(300,300,50,50)
//ox = 0
//oy = 0
function draw() { //p5
    game.processInput()
    game.update()
    game.draw()

    /*
    push()
    textSize(32)
    text(`t:${game.tiles.length}`,300,32*2)
    text(`x:${rect1.x} y:${rect1.y} w:${rect1.width} h:${rect1.height}`,300,32*3)
    t = 0
    game.tiles.forEach(tile => {
        t = tile
        if (rect1.collideRect(tile)) {
            fill('red')
            return
        }
    })
    text(`x:${t.x} y:${t.y} w:${t.width} h:${t.height}`,300,32*4)
    
    rect1.draw()
    pop()
    */
}