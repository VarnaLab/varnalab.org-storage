
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
  --database /...PATH.../schema/varnalab.sqlite \
  --storage /...PATH.../schema/varnalab.sqlite \
  --user root \
  --pass null \
  --dialect sqlite \
  --output /...PATH.../models/
```


# 3. Start Server

```bash
NODE_ENV=production PORT=3000 MODELS=[PATH] node server/
```
