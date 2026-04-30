ALTER TABLE "product"
DROP CONSTRAINT IF EXISTS "product_category_id_category_id_fk";

ALTER TABLE "product"
ADD CONSTRAINT "product_category_id_category_id_fk"
FOREIGN KEY ("category_id") REFERENCES "public"."category"("id")
ON DELETE RESTRICT
ON UPDATE NO ACTION;

CREATE UNIQUE INDEX IF NOT EXISTS "cart_user_id_unique"
ON "cart" USING btree ("user_id");

CREATE UNIQUE INDEX IF NOT EXISTS "cart_item_cart_variant_unique"
ON "cart_item" USING btree ("cart_id", "product_variant_id");
