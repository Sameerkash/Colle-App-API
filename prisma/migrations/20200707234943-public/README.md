# Migration `20200707234943-public`

This migration has been generated at 7/7/2020, 11:49:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "isFaculty" DROP NOT NULL;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200707155209-public..20200707234943-public
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
@@ -26,8 +26,8 @@
   email      String  @unique
   password   String
   name       String?
   posts      Post[]
-  department String
-  isFaculty  Boolean @default(false)
+  department String?
+  isFaculty  Boolean? @default(false)
 }
```


