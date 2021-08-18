FROM mcr.microsoft.com/mssql/server
# Create work directory
RUN mkdir -p /usr/work
WORKDIR /usr/work
# Copy all scripts into working directory
ADD ./scripts /usr/work/
# Grant permissions for the import-data script to be executable
USER root
RUN chmod +x /usr/work/import-data.sh
EXPOSE 1433
CMD /usr/work/import-data.sh ${DB_MSSQL_DATABASE} ${DB_MSSQL_PASSWORD} & /opt/mssql/bin/sqlservr