# Migration `20200707155209-public`

This migration has been generated by Sameer Kashyap at 7/7/2020, 3:52:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" ADD COLUMN "createdAt" timestamp(3)  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200707145851-public..20200707155209-public
--- datamodel.dml
+++ datamodel.dml
@@ -2,28 +2,29 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Post {
-  id        Int     @id @default(autoincrement())
+  id        Int      @id @default(autoincrement())
   title     String
   content   String
-  published Boolean @default(false)
-  author    User?   @relation(fields: [authorId], references: [id])
+  published Boolean  @default(false)
+  author    User?    @relation(fields: [authorId], references: [id])
   authorId  Int?
   imageUrl  String?
+  createdAt DateTime
 }
 model User {
-  id         Int      @id @default(autoincrement())
-  email      String   @unique
+  id         Int     @id @default(autoincrement())
+  email      String  @unique
   password   String
   name       String?
   posts      Post[]
   department String
```


