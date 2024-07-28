#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

WiFiMulti wifiMulti;

// globals
const char* ssid = "WulfPak";
const char* pass = "JL441990jl!!20";
String webServer = "http://192.168.50.129:3000/scenario/api/props";
String propRegEndPoint = "/register";

bool propRegistered = false;
bool propRegistering = false;

uint32_t chipId = 0;
String propType = "Sector";

void setup() {
  Serial.begin(115200);
  wifiMulti.addAP(ssid, pass);
  while ( wifiMulti.run() != WL_CONNECTED ) {
    delay(500);
    Serial.println(".");
  }
}

void loop() {
  if (chipId == 0){
    for (int i = 0; i < 17; i = i + 8) {
      chipId |= ((ESP.getEfuseMac() >> (40 - i)) & 0xff) << i;
    } 
    Serial.print("Chip ID: ");
    Serial.println(chipId);
  }
  if ((wifiMulti.run() == WL_CONNECTED)) {
    Serial.println(".........Connected to WiFi.............");
    if (propRegistered != true){
      if (propRegistering != true){
        registerProp();
      }
    }
  }
  else{
    Serial.println("WiFi Disconnected");
  }
  delay(10000);
}

void getProps(){
    HTTPClient http;
    http.begin(webServer);
    int httpResponseCode = http.GET();    
    if (httpResponseCode > 0){
      Serial.print("HTTP Response Code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }
    else{
      Serial.print("Error Code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
}

void registerProp(){
  HTTPClient http;
  String propReg = webServer += propRegEndPoint;
  JsonDocument doc;
  JsonObject object = doc.to<JsonObject>();
  object["chipId"] = chipId;
  object["propType"] = propType;
  if (propRegistering == false){
    propRegistering = true;
    http.begin(propReg);
    // http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    http.addHeader("Content-Type", "application/json");
    // String data = "Test String";
    char data[128];
    serializeJsonPretty(doc, data);
    // int httpResponseCode = http.POST(data);
    int httpResponseCode = http.POST(data);
    if (httpResponseCode > 0){
      String payload = http.getString();
      Serial.println(payload);
      propRegistered = true;
      propRegistering = false;
    }
    else{
      propRegistered = false;
      propRegistering = false;
    }
  }
  Serial.print("Prop Registered: ");
  Serial.println(propRegistered);
}