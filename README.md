# One AI — free-tier starter
Deploy with Cloudflare Pages connected to a GitHub repository.
1. Upload the contents of this folder to a GitHub repository.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repository; build command blank; output directory `public`.
4. After deployment, Settings → Variables and Secrets → add secret `GEMINI_API_KEY`.
5. Get the key at https://aistudio.google.com/ and redeploy.
Never put the API key in public files or commit it to GitHub. Free-tier quotas can change.
