* How to starting server
1. Start server with `node peer-server.js` from `server` directory
2. Start server with `npm start` and working frontend
3. Visit [http://localhost:3000/](http://localhost:3000/).

* How to creating certification
$ openssl genrsa 2048 > server.key
$ openssl req -new -key server.key > server.csr
$ openssl x509 -days 3650 -req -signkey server.key < server.csr > server.crt

* Access video
You need parameter of room id when you access video page
    ex) "https://xxxxxx/video?id=xxxxxx"