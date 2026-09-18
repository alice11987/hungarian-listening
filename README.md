# Magyar Hallás · 匈牙利语听力练习

A mobile-friendly Hungarian listening practice app with four modes: dictation, multiple choice, shadowing, and free listening.

## Render Deployment

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Click Deploy

## Adding New Content

1. Add items to `src/content/daily.json`, `vocab.json`, or `news.json`
2. Run the audio generation script:
   ```bash
   pip install gtts
   python scripts/generate_audio.py
   ```
3. Commit and push — Render auto-deploys

## Local Development

```bash
npm install
npm run dev
```
