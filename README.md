# Penguin Pay 🐧

## Prerequisites

- Node 22+ and Bun
- Xcode + iOS Simulator (macOS) and/or Android Studio + Emulator
- Recommended: Expo CLI (used via `bun x expo ...`)

## Install dependencies

```bash
bun install
```

## Configure environment

1. Get a free Open Exchange Rates App ID.
2. Copy env and set your key:

```bash
cp .env.example .env
# Edit .env and set EXPO_PUBLIC_OER_APP_ID
```

## Run the app

Recommended (Development Build / Dev Client):

1) Build and install a dev client the first time (and after native config changes, e.g., icons/splash):

```bash
bun run prebuild:clean
# iOS
bun run ios
# Android
bun run android
```

2) Start Metro for Dev Client:

```bash
bun run start
```

Open the app on your simulator/emulator. Subsequent runs usually only need step 2.

Alternative (Expo Go):

```bash
bun run start:go
```

Note: Expo Go won’t display custom icons/splash; use a dev client to verify those.

## Lint and type-check

```bash
# TypeScript
bunx tsc -noEmit
# ESLint
bun x eslint . --max-warnings=0
```

## Troubleshooting

- iOS runtime missing (xcodebuild destination error): open Xcode → Settings → Platforms and install the required iOS Simulator runtime. Then rerun the iOS build.
- If builds fail after config changes, run `bun run prebuild:clean` and rebuild the dev client.

You can start developing by editing files inside the `app` directory. The project uses [Expo Router](https://docs.expo.dev/router/introduction) for file-based routing.

## Penguin Pay Send Screen

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
bun x expo start --dev-client
```