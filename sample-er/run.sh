echo 'Generating MySQL...'
node ../dist/erdiagram-cli.js -f mysql -o output/sample-er-mysql.sql sample-er.erd
echo 'Generating PostgreSQL...'
node ../dist/erdiagram-cli.js -f postgresql -o output/sample-er-postgresql.sql sample-er.erd
echo 'Generating Oracle...'
node ../dist/erdiagram-cli.js -f oracle -o output/sample-er-oracle.sql sample-er.erd
echo 'Generating SQLite...'
node ../dist/erdiagram-cli.js -f sqlite -o output/sample-er-sqlite.sql sample-er.erd
echo 'Generating SQL Server...'
node ../dist/erdiagram-cli.js -f sqlserver -o output/sample-er-sqlserver.sql sample-er.erd

echo 'Generating Java...'
node ../dist/erdiagram-cli.js -f java -o output/sample-er.java sample-er.erd
echo 'Generating TypeScript...'
node ../dist/erdiagram-cli.js -f typescript -o output/sample-er.ts sample-er.erd

echo 'Generating Nomnoml...'
node ../dist/erdiagram-cli.js -f nomnoml -o output/sample-er.nomnoml sample-er.erd
echo 'Generating PlantUML...'
node ../dist/erdiagram-cli.js -f plantuml -o output/sample-er.puml sample-er.erd
