int led = 13;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);
}

void loop() {
  if (Serial.available() > 0) {
    String income = Serial.readStringUntil('%');
    if (income == "on") {
      digitalWrite(led, HIGH);
    } else if (income == "off") {
      digitalWrite(led, LOW);
    }
  }
  int sensor = analogRead(A0);
  Serial.println(String(sensor));
}
