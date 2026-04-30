CREATE INDEX IF NOT EXISTS "session_user_id_idx"
ON "session" USING btree ("user_id");

CREATE INDEX IF NOT EXISTS "account_user_id_idx"
ON "account" USING btree ("user_id");

CREATE INDEX IF NOT EXISTS "product_category_id_idx"
ON "product" USING btree ("category_id");

CREATE INDEX IF NOT EXISTS "product_created_at_idx"
ON "product" USING btree ("created_at");

CREATE INDEX IF NOT EXISTS "product_variant_product_id_idx"
ON "product_variant" USING btree ("product_id");

CREATE INDEX IF NOT EXISTS "shipping_address_user_id_idx"
ON "shipping_address" USING btree ("user_id");

CREATE INDEX IF NOT EXISTS "cart_shipping_address_id_idx"
ON "cart" USING btree ("shipping_address_id");

CREATE INDEX IF NOT EXISTS "cart_item_product_variant_id_idx"
ON "cart_item" USING btree ("product_variant_id");

CREATE INDEX IF NOT EXISTS "order_user_id_idx"
ON "order" USING btree ("user_id");

CREATE INDEX IF NOT EXISTS "order_shipping_address_id_idx"
ON "order" USING btree ("shipping_address_id");

CREATE INDEX IF NOT EXISTS "order_user_status_created_at_idx"
ON "order" USING btree ("user_id", "status", "created_at");

CREATE INDEX IF NOT EXISTS "order_item_order_id_idx"
ON "order_item" USING btree ("order_id");

CREATE INDEX IF NOT EXISTS "order_item_product_variant_id_idx"
ON "order_item" USING btree ("product_variant_id");
