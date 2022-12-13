docker run --name testMaria --rm -d -p 5432:5432 -v "$(pwd)/dummy:/var/lib/mysql" -e MARIADB_ROOT_PASSWORD=123 mariadb --port 5432
npm start
docker stop testMaria