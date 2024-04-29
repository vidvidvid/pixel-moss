#include <WiFiS3.h>
#include <Wire.h>
#include <Digital_Light_TSL2561.h> // Include the library for the Digital Light Sensor

const char ssid[] = "A1-B0C4A6";
const char pass[] = "kewaxe2625";
WiFiServer server(80);

const int moisturePin = A0; // Assuming the moisture sensor is connected to A0

void setup() {
  Serial.begin(9600);
  Wire.begin(); // Begin I2C for the light sensor
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  TSL2561.init(); // Initialize the TSL2561 light sensor
  server.begin();
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Read sensor values
  unsigned long lightLevel = TSL2561.readVisibleLux(); // Read light level in lux from the TSL2561
  int moistureLevel = analogRead(moisturePin); // Read moisture level

  // Print sensor values to Serial Monitor
  Serial.print("Light level: ");
  Serial.print(lightLevel);
  Serial.println(" lux");
  Serial.print("Moisture level: ");
  Serial.println(moistureLevel);

  // WiFi client handling omitted for brevity, similar to previous examples
  // Include code here to serve sensor data over WiFi as JSON
}