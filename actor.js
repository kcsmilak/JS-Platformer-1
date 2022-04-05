

class Actor extends Rectangle {

    static get MOVEMENT_IDLE() { return 0 }
    static get MOVEMENT_RIGHT() { return 1 }
    static get MOVEMENT_LEFT() { return -1 }

    static get DIRECTION_FACING() { return 0 }
    static get DIRECTION_RIGHT() { return 1 }
    static get DIRECTION_LEFT() { return -1 }
    
    constructor() {
        super()

        this.image = null

        this.xspeed = 0
        this.yspeed = 0
        
        this.movement = Actor.MOVEMENT_IDLE
        this.direction = Actor.DIRECTION_RIGHT
        
    }

    animate() {
        
    }


}