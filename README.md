
# 1. Import Database

```bash
node schema/import.js
```


# 2. Generate Models

```bash
npm install -g sequelize-auto sqlite3
```

```bash
sequelize-auto \
  --host localhost \
  --database /home/s/...PATH.../schema/varnalab.sqlite \
  --storage /home/s/...PATH.../schema/varnalab.sqlite \
  --user root \
  --pass null \
  --dialect sqlite \
  --output /home/s/...PATH.../models/
```


# 3. Start Server

```bash
NODE_ENV=production PORT=3000 MODELS=[PATH] node server/
```
