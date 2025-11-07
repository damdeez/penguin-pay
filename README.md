# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## PenguinPay Send Screen

- Send screen lives at `app/send/index.tsx:1`.
- Reusable inputs/components in `components/`.
- Exchange rates fetched via Open Exchange Rates if `EXPO_PUBLIC_OER_APP_ID` is set; otherwise uses fallback demo rates.
- Validation powered by Zod (see `hooks/useSendValidation.ts:1`).

Environment variable setup (live rates):

1. Create a free account at openexchangerates.org and obtain an App ID.
2. Copy `.env.example` to `.env` and fill in your key:

```bash
cp .env.example .env
# edit .env and set EXPO_PUBLIC_OER_APP_ID
```

Expo automatically loads `.env` and exposes variables starting with `EXPO_PUBLIC_` to `process.env` in the app. Then start the app:

```bash
npx expo start
```

## Icons and Splash

- App icon (iOS/Android): `app.json` points to `assets/images/icon.png` and Android adaptive layers in `assets/images/`.
- Splash screen: configured via `expo-splash-screen` plugin using `assets/images/splash-icon.png`.
- Web favicon: `assets/images/favicon.png`.

Branding SVG sources are provided in `assets/branding/` so you can iterate:

- `assets/branding/penguin-mark.svg` – base icon artwork.
- `assets/branding/penguin-splash.svg` – splash composition.
- `assets/branding/favicon.svg` – favicon source.

Export/update raster assets (macOS example using `sips`):

```bash
# App icon (1024x1024)
sips -s format png assets/branding/penguin-mark.svg --out assets/images/icon.png --resampleWidth 1024

# Splash (2048x2048)
sips -s format png assets/branding/penguin-splash.svg --out assets/images/splash-icon.png --resampleWidth 2048

# Favicon (256x256)
sips -s format png assets/branding/favicon.svg --out assets/images/favicon.png --resampleWidth 256

# Android adaptive icon layers (1024x1024)
sips -s format png assets/branding/android-icon-foreground.svg --out assets/images/android-icon-foreground.png --resampleWidth 1024
sips -s format png assets/branding/android-icon-background.svg --out assets/images/android-icon-background.png --resampleWidth 1024
sips -s format png assets/branding/android-icon-monochrome.svg --out assets/images/android-icon-monochrome.png --resampleWidth 1024
```

Android adaptive icon layers already point to files in `assets/images/`. You can export light foreground/background variants similarly and replace them if desired.

Note: For full schema-based validation we recommend `zod`. If you prefer, install it and we can switch the custom validators to Zod.
We now use Zod. Install dependencies if needed:

```bash
bun add zod
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
