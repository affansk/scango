# ScanGo App Readme

Welcome to ScanGo, a powerful mobile application that enables you to effortlessly scan barcodes, send SMS messages, and manage your scan orders—all in one convenient platform. This README will guide you through the process of setting up and running the ScanGo app, as well as building the release APK for distribution.


# Run the following command:

1. yarn install Also do Pod Install for IOS
2. yarn run android:scango OR npx react-native run-android 
3. npx react-native run-ios OR Open the Xcode and run (IOS)

The Build will be Generated, which will take you to landing screen which has input box and a button to scan the qr code, if barcode is valid then it will open SMS App, where user can sent sms. also the scan order record is created in DB(firebase) for future refrences

If Qr Code is Invalid no Sms App will open and it will show toast message with error information

if Qr Code Permission is denied, when you again open the app, it will take you to settings screen to enable camera permission with alert message

# How to Create a APK
1. yarn run android:scango:build

The above command will create Release Build, so you can install the app in your phone, at the moment build is not available for IOS, as we need lot of certificates to run the app in mobile device. even for IPA-build we need provisioning profile, other certificate, etc

# The Package Used :
1. react native camera kit for barcode scanning
2. react native sms with expo package to handle direct openeing of sms app
3. react native permission for checking and managing permissions
4. reqact native boosplash for having nice splash screen (just for having proper app flow)
5. react native firebase with firestore for storing scan orders.
6. React Qurery for managing API response and if needed for caching API records

# Note
1. The App is Based on Bare React Native Project not Expo, we have use expo(android) configuration for properly handle sms App.
2. Camera Will not Open in IOS simulator, we need to run the app in proper IOS device, for that we need development certificates.







