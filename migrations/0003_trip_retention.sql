ALTER TABLE `trips` ADD `retention_notice` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `trips` ADD `retention_notice_at` integer;