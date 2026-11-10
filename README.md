# One AI — Gemini + Netlify starter

This project keeps the original One AI interface and replaces the Claude-only browser hook with a secure server-side Gemini request.

## What's included
- `public/index.html` — your One AI interface, updated to call the backend
- `netlify/functions/chat.mjs` — server-side Gemini API function
- `public/manifest.webmanifest` + `public/sw.js` — installable PWA shell
- `public/icons/` — app icons
- `public/privacy.html` — starter privacy notice; complete it before launch
- `netlify.toml` — Netlify configuration

## 1. Create a Gemini API key
1. Open https://aistudio.google.com/apikey
2. Create an API key.
3. Do not paste the key into HTML, JavaScript, GitHub, or a public file.

The function uses the stable `gemini-3.8-flash` model by default. Google may change model availability or free-tier limits; check current pricing and quota in AI Studio before launch.

## 2. Deploy to Netlify
Recommended: use GitHub so future changes can deploy automatically.

1. Create/sign in to GitHub and create a **private** repository named `one-ai`.
2. Upload the contents of this folder (the `public`, `netlify` folders, `netlify.toml`, etc.) to the repository root.
3. In Netlify, choose **Add new project → Import an existing project**, connect GitHub, and select `one-ai`.
4. Netlify should detect the `netlify.toml` configuration. Publish directory is `public`.
5. In Netlify: **Project configuration → Environment variables**, add:
   - `GEMINI_API_KEY` = your real Gemini key
   - `GEMINI_MODEL` = `gemini-3.8-flash`
6. Trigger a fresh deploy after setting the variables.
7. Open the deployed Netlify URL and test a chat.

Netlify Functions can read environment variables at runtime. Never commit the real key.

## 3. Local development (optional)
Install Node.js LTS, then run:

```bash
npm install -g netlify-cli
netlify login
netlify dev
```

Set the environment variable locally in your shell or in a local `.env` file (never commit `.env`). Netlify CLI loads local development variables.

## 4. Rename the free Netlify address
In Netlify: **Domain management → Production domains → Options → Edit site name**. Choose an available name such as `one-ai-assistant`. The URL will look like `https://one-ai-assistant.netlify.app`.

## 5. Android app after the website works
A PWA can be installed from a supported Android browser. For a Play Store app, use a Trusted Web Activity (TWA) with Bubblewrap after the final HTTPS domain is chosen.

On a computer with Node.js and Android build tools:
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://YOUR-SITE.netlify.app/manifest.webmanifest
bubblewrap build
```

Follow Bubblewrap prompts. Choose a unique application ID, app name `One AI`, and generate/store the signing key safely. The resulting signed Android package can be tested. For Play Store release, follow current Play Console account verification, app testing, target API, data safety, privacy policy, and Digital Asset Links requirements. The website must remain at the same domain and host the correct `/.well-known/assetlinks.json` file for TWA verification.

Do not submit the app to Google Play until the website, API, privacy policy, support contact, and Android build have been tested.

## Important launch checks
- Complete `public/privacy.html` with a real support email and accurate data-retention details.
- Add abuse protection/rate limiting before sharing widely. This starter validates request size and history but does not provide robust per-user rate limiting.
- Set API quotas/budget alerts in Google AI Studio/Cloud as available.
- Do not claim unlimited or guaranteed-free AI usage.
- Test on mobile and desktop.
