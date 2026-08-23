# Virya Admissions Data

The app currently uses a temporary local JSON datastore at `data/applications.json`.
It is intentionally dependency-free so the school application workflow can be tested
without buying hosting, a domain, or a cloud database.

## Recommended Database Path

For local development, keep using the temporary store or move to SQLite.

For a real private school site, use Azure SQL or Microsoft SQL Server when:

- staff need reliable admissions records
- multiple admins need access
- backups, audit history, and permissions matter
- the site is deployed publicly

The SQL Server table design is in `sql-server-schema.sql`.

## SQL Injection Safety

The running app does not execute SQL yet; it writes to the temporary JSON file
through `server/index.js`. If you move this workflow to SQL Server, keep these
rules:

- validate request fields in the API before touching the database
- use SQL parameters or the `dbo.CreateStudentApplication` stored procedure
- never build SQL by concatenating form input into a query string
- keep the table constraints so invalid grades and statuses are rejected twice:
  once by the API and again by the database

## Domain

A domain is not required to build or test the site. Buy a domain when you are ready
to publish the school website publicly and connect email, SSL, and hosting.
