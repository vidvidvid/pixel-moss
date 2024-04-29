#include <WiFiS3.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>

Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(0x29, 12345);

const char ssid[] = "FRITZ!Box 7590 CS";
const char pass[] = "90532202465471779502";

// Create a WiFiServer object that listens on port 80 (HTTP standard port)
WiFiServer server(80);

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  server.begin(); // Start the server to listen for incoming connections
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize the TSL2561 light sensor
  if (!tsl.begin()) {
    Serial.println("No TSL2561 detected");
    while (1);
  }
}

void loop() {
  WiFiClient client = server.available(); // listen for incoming clients
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\n' && currentLineIsBlank) {
          // Add CORS header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Connection: close");
          client.println("Access-Control-Allow-Origin: *"); // Allow all domains
          client.println();

          sensors_event_t event;
          tsl.getEvent(&event);

          // Send the JSON response with the light reading
          client.print("{\"luminosity\":");
          if (event.light) {
            client.print(event.light);
          } else {
            client.print("0");
          }
          client.println("}");
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();
  }
}