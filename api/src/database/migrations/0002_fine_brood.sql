ALTER TABLE "points" RENAME COLUMN "quantity" TO "total";--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "attendance" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "punctuality" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "participation" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "visits" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "offer" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "teacher" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD COLUMN "schedule" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "points" ADD CONSTRAINT "points_quantity_non_negative" CHECK ("points"."total" >= 0);