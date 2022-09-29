music.setVolume(256)
radio.setGroup(256)
radio.setTransmitPower(7)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
radio.onReceivedNumber(function (receivedNumber) {
    while (!(input.buttonIsPressed(Button.B))) {
        GigoFuture.digitalWrite(GigoLED.C, true)
        music.playMelody("G - G - G - G - ", 240)
        GigoFuture.digitalWrite(GigoLED.C, false)
        GigoFuture.wait(0.25)
    }
})
input.onButtonPressed(Button.A, function () {
    while (!(input.buttonIsPressed(Button.B))) {
        GigoFuture.digitalWrite(GigoLED.B, true)
        music.playMelody("B - B - B - B - ", 240)
        GigoFuture.digitalWrite(GigoLED.B, false)
        GigoFuture.wait(0.25)
        radio.sendNumber(999)
    }
})
input.onButtonPressed(Button.B, function () {
    music.stopAllSounds()
    GigoFuture.digitalWrite(GigoLED.B, false)
})
basic.forever(function () {
    if (GigoFuture.analogRead(PinAnalog.P1) > 500) {
        GigoFuture.digitalWrite(GigoLED.D, true)
    }
    if (GigoFuture.analogRead(PinAnalog.P1) < 500) {
        GigoFuture.digitalWrite(GigoLED.D, false)
    }
})
