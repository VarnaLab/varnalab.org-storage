
# Install

For now clone this repo.

# CLI

```bash
./bin/cli -h # for help
```

# Start Server

```bash
# start the server at port 3000 and create the varnalab.sqlite file in the current directory
./bin/cli
# specify port
./bin/cli -p 8000
# specify where you want the varnalab.sqlite file to be created
./bin/cli -p 8000 -d /path/to/
# specify existing database file
./bin/cli -p 8000 -d /path/to/varnalab.sqlite
```

# Rebuild Models

After each change to the schema the Sequelize models should be rebuilt:

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
