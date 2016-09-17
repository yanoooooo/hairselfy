#include <SoftwareSerial.h>
//#include <Servo.h>

//Servo myServo; //servo object
int servoRot = 0;
int servoPin = 9;
int val = 0;

int bluetoothRx = 11;  // RX-I of bluetooth
int bluetoothTx = 10;  // TX-O of bluetooth

SoftwareSerial btSerial(bluetoothRx, bluetoothTx); // RX, TX

void setup() {
  // put your setup code here, to run once:
  Serial.begin(19200);
  //myServo.attach(servoPin);
  btSerial.begin(115200);
  Serial.write("init");
}

void loop() {
  // put your main code here, to run repeatedly:
  //int Serialvalue = 20>>2;
  //Serial.write("test");
  if(btSerial.available()){
    Serial.println(btSerial.read());
  };
  if(Serial.available()){
    btSerial.write(Serial.read());
  };
  //val = val + 15;
  //myServo.write(val);
  //delay(100);
  // Bluetoothへ送信
  //btSerial.write(1);
  //Serial.println(btSerial.read());

  delay(1000);
}
