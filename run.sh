cd /app/frontend
pm2 start npm --name "streamer_ui" -- run dev

cd /app/backend
pm2 start app.js

nginx
