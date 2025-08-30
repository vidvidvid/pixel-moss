# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Run a single test file
npm test -- src/App.test.js
```

## Architecture Overview

This is a React-based web application that visualizes and interacts with sensor data from an Arduino device monitoring moss growth conditions. The application connects to Firebase Realtime Database for data persistence and real-time updates.

### Core Data Flow
1. **Arduino Device** (see `src/Arduino/`) → Collects light and moisture sensor data
2. **Firebase Realtime Database** → Stores sensor readings and moss messages
3. **React Frontend** → Displays real-time charts and interactive moss visualization

### Key Architectural Components

#### Firebase Integration (`src/firebaseService.js`)
- Manages all Firebase Realtime Database operations
- Key functions:
  - `writeSensorData()` - Pushes sensor readings to `sensors/` path
  - `subscribeToSensorData()` - Real-time subscription to sensor updates
  - `writeMossMessage()` - Stores moss status messages
  - `subscribeToMossMessages()` - Real-time subscription to moss messages
- Uses Firebase v10 modular SDK with error handling and logging

#### Responsive Layout System
The app adapts between horizontal and vertical layouts based on viewport aspect ratio:
- **Horizontal Layout** (`src/components/LayoutHorizontal.js`) - Desktop/landscape
- **Vertical Layout** (`src/components/LayoutVertical.js`) - Mobile/portrait
- Layout switching logic in `src/App.js` based on `innerHeight / innerWidth > 1`

#### Data Visualization
- **Real-time Charts** (`src/components/RealTimeChart.js`) - Uses ECharts for rendering time-series sensor data
  - Light level (yellow line)
  - Moisture level (purple line)
- Chart updates automatically via Firebase subscriptions

#### Component Structure
- **App.js** - Main component handling layout switching and audio player state
- **MossInteraction.js** - Interactive moss visualization responding to sensor data
- **MossMessages.js** - Displays timestamped moss status messages
- **Audio/AudioVertical.js** - Audio playback components with play/pause controls
- **PixelmossImages** components - Visual moss growth representations

### Arduino Integration
The Arduino code (`src/Arduino/WORKINGEXAMPLE.c`) runs on an Arduino with:
- TSL2561 Digital Light Sensor (I2C)
- Moisture sensor (Analog pin A0)
- WiFi module serving HTTP endpoints with JSON sensor data
- CORS headers configured for browser access

### Styling Approach
- Custom fonts loaded from `/public/fonts/`
- Background image-based design with overlays
- CSS classes for font families: `voxel-font`, `scum-font`, `ibm-font`
- Custom cursor styling via `custom-cursor` class

## Important Notes

- Firebase configuration must be set up in `src/firebaseConfig.js` (not tracked in git)
- CORS must be disabled or properly configured for Arduino HTTP endpoints
- The app expects sensor data in format: `{ lightLevel: number, moistureLevel: number, time: timestamp }`
- Audio files are stored in `/public/songs/`