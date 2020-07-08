# Migration `20200708120526-public`

This migration has been generated at 7/8/2020, 12:05:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP COLUMN "createdAt",
ADD COLUMN "createdAt" text  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200707234943-public..20200708120526-public
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,9 +17,9 @@
   published Boolean  @default(false)
   author    User?    @relation(fields: [authorId], references: [id])
   authorId  Int?
   imageUrl  String?
-  createdAt DateTime
+  createdAt String
 }
 model User {
   id         Int     @id @default(autoincrement())
```


