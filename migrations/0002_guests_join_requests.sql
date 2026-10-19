CREATE TABLE `join_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`trip_id` text NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `join_requests_trip` ON `join_requests` (`trip_id`);--> statement-breakpoint
CREATE INDEX `join_requests_user` ON `join_requests` (`user_id`);--> statement-breakpoint
ALTER TABLE `user` ADD `isAnonymous` integer DEFAULT 0;