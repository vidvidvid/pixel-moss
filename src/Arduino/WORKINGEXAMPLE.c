// dont't forget to disable CORS

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
  WiFiClient client = server.available(); // Listen for incoming clients
  if (client) { // If a client is connected
    Serial.println("Client connected");
    // Read and discard headers
    while (client.connected()) {
      if (client.available()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") { // Check for the end of the headers
          Serial.println("Sending response...");
          // Send HTTP response headers
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Connection: close"); // Advise the client to close the connection
          client.println("Access-Control-Allow-Origin: *"); // Crucial for CORS
          client.println(); // End of headers

          unsigned long lightLevel = TSL2561.readVisibleLux(); // Read light level in lux
          int moistureLevel = analogRead(moisturePin); // Read moisture level
          
          // Construct and send the JSON payload
          client.print("{\"lightLevel\":");
          client.print(lightLevel);
          client.print(", \"moistureLevel\":");
          client.print(moistureLevel);
          client.println("}");
          
          break; // Exit the loop after sending the response
        }
      }
    }
    delay(10); // Give the client time to receive the data
    client.stop(); // Close the connection
    Serial.println("Client disconnected");
  }
}