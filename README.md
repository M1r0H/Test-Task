## Start the project:

1) **Node version: `20.11.0`**

2) **Copy the `env.example` file to `.env`.**

```bash 
docker-compose up
```

- If you need clear ports:

```bash 
chmod +x start.sh
```

```bash 
sudo ./start.sh
```

- After that you can use:

```bash
docker-compose up
```

3) **[Swagger](http://localhost:3001/swagger) documentation.**


4) **Administration credentials:**

```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

## Stop the project:

```bash 
docker-compose down
```