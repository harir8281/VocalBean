# 🎙️ Vocal Bean – React Native Voice Recorder with Live Waveform
This app is a simple, elegant React Native audio recording application that allows users to:

Start and stop voice recordings

View a real-time animated waveform preview while recording (inspired by the Loom app)

Experience smooth, responsive audio interaction

📱 Currently supports Android platform.

📸 Screenshots
![completed](https://github.com/user-attachments/assets/490c0cb5-8c30-49d5-90e1-faa3cd615f27)

Recording Idle	Recording Active	Waveform Preview	Recording Stopped

🚀 Features
🎙️ Tap-to-record button interface

📈 Live waveform animation using react-native-skia

📦 Optimized bundle size

💾 (Optional) Save and display recording list

🔄 Minimal and clean UI based on Figma designs

📦 Tech Stack
React Native

TypeScript

react-native-skia for real-time waveform rendering

react-native-audio-recorder-player for audio capture

🛠️ Getting Started
Make sure your environment is ready by following the React Native Environment Setup.

Step 1: Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/vocal-bean.git
cd vocal-bean
Step 2: Install dependencies
bash
Copy
Edit
# Using npm
npm install

# Using Yarn
yarn install
Step 3: Start Metro
bash
Copy
Edit
# Using npm
npm start

# Using Yarn
yarn start
Step 4: Run the app
Android
bash
Copy
Edit
npm run android
# or
yarn android
iOS (if supported in future)
bash
Copy
Edit
cd ios
pod install
cd ..
npm run ios
# or
yarn ios
