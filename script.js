
let WIDTH = 640
let HEIGHT = 480
/**
 * APP
 */

jbox = new Jbox()

function preload() { //p5
    jbox.preload()
}

function setup() { //p5
    jbox.setup()
}

function mouseClicked(event) { //p5
    console.log(event)
    jbox.mouseClicked(event.x,event.y)

    //handleMouseClicked(event.x, event.y)

    // prevent default
    return false;    
}

function mousePressed() { //p5

}

function keyPressed(event) { //p5
    jbox.keyPressed(event.keyCode)
}

function mouseDragged(event) { //p5

}

function mouseWheel(event) { //p5

}

function setup() { //p5
    createCanvas(WIDTH, HEIGHT) //p5
}


function draw() { //p5
    jbox.processInput()
    jbox.update()
    jbox.draw()
}