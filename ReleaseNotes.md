### V2.2.1

2 Main update is to console log so the API tells us more about the statusses returned.
.1 Set (roll back from update 1.5.0) back queries to use: req.query
.2 To get better search results added some functionality to the queries (contains and gte)

..1 Improved some of the Q says: texts.

### V1.5.1

Finalized the error messaging.
Log the number of records to update info.

### V1.5.0

Added additional error handling on the create and update.
Updated get request roll back to original open query.

### V1.4.0

Updated booking and resolved the issues with positive testing.
Special thanks to Jordy from WINC academy to see the typo in filenaming.

### V1.3.1

This version is ready to go!
.3 Updated router and utilities to have less errors.
.1 Added some styiling and naming updates to make things more readable.

### V 1.2.1

Minor changes to the seeding code, as translating profilePicture to pictureURL is no longer needed.

### V 1.2.0

On this migration version:

- Enabling Cascade functionality. This might be controversial, however its a small database, so its easy to track.
- Update pictureURL columns to profilePicture, as this is the widely used variable.

### V 1.1.0

In this version, a migration was made to rectify the column names on pictureURL columns.
This made seeding the data easier.

### V 1.0.0

Initial migration, we have a working database and database mirror.
Internal use only at this point.
