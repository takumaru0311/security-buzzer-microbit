
/**
 * 未来シリーズ(microbit用：GIGOサーボモーターのみ)
 */

enum PinAnalog {
    P1 = AnalogPin.P1,
    P2 = AnalogPin.P2,
}

enum PinDigital {
    P1,
    P2,
    P8,
    P12,
    P13,
    P14,
    P15,
    P16,
}

enum GigoPin {
    A, B, C, D, E, F, G, H,
}

enum GigoMotor {
    E = GigoPin.E,
    F = GigoPin.F,
    G = GigoPin.G,
    H = GigoPin.H,
}

enum GigoLED {
    B = GigoPin.B,
    C = GigoPin.C,
    D = GigoPin.D,
    E = GigoPin.E,
    F = GigoPin.F,
    G = GigoPin.G,
    H = GigoPin.H,
}

enum GigoSensor {
    A = GigoPin.A,
    E = GigoPin.E,
    F = GigoPin.F,
    G = GigoPin.G,
    H = GigoPin.H,
}

namespace basic {
    /**
     * 指定した時間(秒)だけ待つ
     * @param interval 待ち時間; eg: 1
     */
    //% block="%interval 秒待つ"
    //% weight=1 blockGap=8
    export function wait(interval: number) {
        basic.pause(interval * 1000);
    }
}

namespace input {
    /**
     * アナログセンサーの入力値を読み取る
     * @param pin センサーの入力ピン
     */
    //% block="センサー%pinの値"
    //% weight=1 blockGap=8
    export function analogRead(pin: PinAnalog): number {
        switch (pin) {
            case PinAnalog.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case PinAnalog.P2:
                return pins.analogReadPin(AnalogPin.P2);
        }
        return 0;
    }
}

/**
 * カスタムブロック
 */
//% weight=1000 color=#1EAA39 icon="\uf109" block="未来シリーズ"
// (Free Icons)https://fontawesome.com/icons?d=gallery&m=free
namespace GigoFuture {

    /**
     * 指定した時間(秒)だけ待つ
     * @param interval 待ち時間; eg: 1
     */
    //% block="%interval 秒待つ"
    export function wait(interval: number) {
        basic.pause(interval * 1000);
    }

    /**
     * LEDをオン・オフする
     * @param pin LEDの制御ピン; eg: GigoLED.B
     * @param led LEDをオン/オフ; eg: true
     */
    //% block="LED %pin / %led"
    //% led.shadow=toggleOnOff
    //% led.defl=true
    export function digitalWrite(pin: GigoLED, led: boolean) {
        // LED control pin
        let control = GetControlPin(pin);
        // if the variable is defined
        if (typeof control !== 'undefined') {
            pins.digitalWritePin(control, led ? 1 : 0);
        }
    }

    /**
     * サーボモーターを指定の向き・速さで回転させる
     * @param pin GIGOモーター制御ピン; eg: GigoMotor.E
     * @param dir 回転方向; eg: Direction.Right
     * @param speed 回転速度(オプション); eg: 100
     */
    //% block="モーター　%pin / %dir 向き || / 速度 %speed"
    //% speed.min=0 speed.max=255
    //% speed.defl=100
    //% expandableArgumentMode="toggle"
    export function setMotorSpeed(pin: GigoMotor, dir: Direction, speed = 255) {
        // if used Gigo pin is able to use DDM motor
        if (CheckMotorAvailable(pin)) {
            // pin to set motor direction
            let control = GetControlPin(pin);
            // pin to set motor speed
            let data = GetDataPin(pin);
            // control motor
            DDMmotor(control, dir, data, speed);
        }
    }

    /**
     * サーボモーターを停止する
     * @param pin GIGOモーター制御ピン; eg: GigoMotor.E
     */
    //% block="モーター　%pin 停止"
    export function stopMotor(pin: GigoMotor) {
        // if used Gigo pin is able to use DDM motor
        if (CheckMotorAvailable(pin)) {
            // pin to set motor direction
            let control = GetControlPin(pin);
            // pin to set motor speed
            let data = GetDataPin(pin);
            // control motor
            DDMmotor(control, Direction.Right, data, 0);
        }
    }

    /**
     * サーボモーター（角度）の位置を指定の角度にする
     * @param pin モーター制御ピン; eg: PinDigital.P1
     * @param angle 角度; eg: 90
     */
    //% block="モーター %pin / 角度 %angle"
    //% angle.min=0 angle.max=180
    //% angle.defl=90
    //% angle.shadow="protractorPicker"
    export function writeAngleServo(pin: PinDigital, angle: number) {
        switch (pin) {
            case PinDigital.P1:
                pins.servoWritePin(AnalogPin.P1, angle);
                break;
            case PinDigital.P2:
                pins.servoWritePin(AnalogPin.P2, angle);
                break;
            case PinDigital.P8:
                pins.servoWritePin(AnalogPin.P8, angle);
                break;
            case PinDigital.P12:
                pins.servoWritePin(AnalogPin.P12, angle);
                break;
            case PinDigital.P13:
                pins.servoWritePin(AnalogPin.P13, angle);
                break;
            case PinDigital.P14:
                pins.servoWritePin(AnalogPin.P14, angle);
                break;
            case PinDigital.P15:
                pins.servoWritePin(AnalogPin.P15, angle);
                break;
            case PinDigital.P16:
                pins.servoWritePin(AnalogPin.P16, angle);
                break;
        }
    }

    /**
     * アナログセンサーの入力値を読み取る
     * @param pin センサーの入力ピン
     */
    //% block="センサー%pinの値"
    export function analogRead(pin: PinAnalog): number {
        switch (pin) {
            case PinAnalog.P1:
                return pins.analogReadPin(AnalogPin.P1);
            case PinAnalog.P2:
                return pins.analogReadPin(AnalogPin.P2);
        }
        return 0;
    }

    /**
     * GIGOサーボモーター(DDMモーター)の制御関数
     * @param McontrolPin 回転方向の制御ピン
     * @param McontrolValue 回転方向 (Direction.Left or Direction.Right)
     * @param MSpeedPin 回転速度の制御ピン
     * @param MSpeedValue 回転速度 (0-255)
     */
    function DDMmotor(McontrolPin: AnalogPin, McontrolValue: Direction, MSpeedPin: AnalogPin, MSpeedValue: number): void {
        // rotational direction
        pins.analogWritePin(McontrolPin, pins.map(McontrolValue, Direction.Left, Direction.Right, 0, 1023));
        // angular speed
        pins.analogWritePin(MSpeedPin, pins.map(MSpeedValue, 0, 255, 0, 1023));
    }

    function GetControlPin(assign: number): number {
        switch (assign) {
            case GigoPin.A:
                return AnalogPin.P19;
            case GigoPin.B:
                return AnalogPin.P14;
            case GigoPin.C:
                return AnalogPin.P2;
            case GigoPin.D:
                return AnalogPin.P8;
            case GigoPin.E:
                return AnalogPin.P15;
            case GigoPin.F:
                return AnalogPin.P13;
            case GigoPin.G:
                return AnalogPin.P12;
            case GigoPin.H:
                return AnalogPin.P1;
        }
        return undefined;
    }

    function GetDataPin(assign: number): number {
        switch (assign) {
            case GigoPin.A:
                return AnalogPin.P20;
            case GigoPin.E:
                return AnalogPin.P16;
            case GigoPin.F:
                return AnalogPin.P14;
            case GigoPin.G:
                return AnalogPin.P2;
            case GigoPin.H:
                return AnalogPin.P8;
        }
        return undefined;
    }

    function CheckMotorAvailable(assign: number) {
        return assign == GigoPin.E || assign == GigoPin.F || assign == GigoPin.G || assign == GigoPin.H;
    }
} 