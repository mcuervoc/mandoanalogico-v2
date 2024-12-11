function Muestra (Direccion: number) {
    if (Direccion == 1) {
        basic.showArrow(ArrowNames.South)
    }
    if (Direccion == 2) {
        basic.showArrow(ArrowNames.East)
    }
    if (Direccion == 4) {
        basic.showArrow(ArrowNames.North)
    }
    if (Direccion == 8) {
        basic.showArrow(ArrowNames.West)
    }
    if (Direccion == 9) {
        basic.showArrow(ArrowNames.SouthWest)
    }
    if (Direccion == 3) {
        basic.showArrow(ArrowNames.SouthEast)
    }
    if (Direccion == 6) {
        basic.showArrow(ArrowNames.NorthEast)
    }
    if (Direccion == 12) {
        basic.showArrow(ArrowNames.NorthWest)
    }
    if (Direccion == 0) {
        basic.showIcon(IconNames.No)
    }
}
let Velocidad = 0
let Y = 0
let X = 0
let Direccion = 0
radio.setGroup(1)
let Anterior = 0
let VAnterior = 0
radio.sendNumber(0)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
basic.forever(function () {
    Direccion = 0
    X = Math.map(pins.analogReadPin(AnalogReadWritePin.P1), 0, 1023, -100, 100)
    Y = Math.map(pins.analogReadPin(AnalogReadWritePin.P2), 0, 1023, -100, 100)
    if (X < -25) {
        Direccion += 8
    }
    if (X > 25) {
        Direccion += 2
    }
    if (Y > 25) {
        Direccion += 4
    }
    if (Y < -25) {
        Direccion += 1
    }
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        Direccion += 1
    }
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        Direccion += 2
    }
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        Direccion += 4
    }
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        Direccion += 8
    }
    if (Math.abs(X) >= Math.abs(Y)) {
        Velocidad = Math.abs(X) + 100
    } else {
        Velocidad = Math.abs(Y) + 100
    }
    if (input.buttonIsPressed(Button.A)) {
        Direccion = Direccion + 200
    }
    if (input.buttonIsPressed(Button.B)) {
        Direccion = Direccion + 100
    }
    if (Math.abs(Velocidad - VAnterior) > 10) {
        radio.sendNumber(Velocidad)
        VAnterior = Velocidad
    }
    if (Direccion != Anterior) {
        radio.sendNumber(Velocidad)
        radio.sendNumber(Direccion)
        Anterior = Direccion
        Muestra(Direccion)
    }
})
