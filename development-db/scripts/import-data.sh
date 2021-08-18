# wait for the SQL Server to come up
sleep 90s

#create a setup script to create the DB and the schema in the DB
touch setup.sql
printf "CREATE DATABASE $1; \nGO \nUSE $1;\nGO" >> setup.sql

#run the setup script 
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P $2 -i setup.sql