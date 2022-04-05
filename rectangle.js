class Rectangle {
    constructor(x=0, y=0, width=0,height=0) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get top() { return this.y }
    get bottom() { return this.y + this.height }
    get left() { return this.x }
    get right() { return this.x + this.width }

    set right(value) { this.x = value - this.width }
    set left(value) { this.x = value }
    set top(value) { this.y = value }
    set bottom(value) { this.y = value - this.height }

    collideRect(rect2) {
        let rect1 = this
        return rect1.right > rect2.left && 
            rect1.left < rect2.right && 
            rect1.bottom > rect2.top && 
            rect1.top < rect2.bottom
    }

    collidePoint(x,y) {
        if (x >= this.left &&        
            x <= this.right &&   
            y >= this.top &&   
            y <= this.bottom) { 
            return true;
        }

        return false;
        
    }
    
    draw() {
        rect(this.x, this.y, this.width, this.height) //p5
    }   
}
