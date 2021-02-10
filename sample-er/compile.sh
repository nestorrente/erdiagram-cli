echo 'Generating MySQL...'
node ../dist/erdiagram-cli.js -f mysql -o sample-er-mysql.sql sample-er.erd
echo 'Generating SQL Server...'
node ../dist/erdiagram-cli.js -f sqlserver -o sample-er-sqlserver.sql sample-er.erd
echo 'Generating Oracle DB...'
node ../dist/erdiagram-cli.js -f oracle -o sample-er-oracle.sql sample-er.erd
echo 'Generating Java...'
node ../dist/erdiagram-cli.js -f java -o sample-er.java sample-er.erd
echo 'Generating TypeScript...'
node ../dist/erdiagram-cli.js -f typescript -o sample-er.ts sample-er.erd
