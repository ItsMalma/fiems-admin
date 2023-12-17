import { z } from "zod";
import {
  ProductForm,
  ProductTableRow,
  extractProductSKUCode,
  productInput,
  productTypes,
} from "../dtos/product.dto";
import {
  createProduct,
  deleteProduct,
  findAllProduct,
  findNextProductSKUCode,
  findProductBySKUCode,
  updateProduct,
} from "../stores/product.store";
import { findAllProductCategory } from "../stores/productCategory.store";
import { publicProcedure, router } from "../trpc";
import { validateCode, validateSelectWithEnum } from "../validation";

export const productsRouter = router({
  getTableRows: publicProcedure.query<ProductTableRow[]>(async () => {
    return (await findAllProduct()).map((product) =>
      ProductTableRow.fromModel(product)
    );
  }),

  getSingle: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) => {
      if (!input) return;

      return await findProductBySKUCode(input);
    }),

  getForm: publicProcedure
    .input(
      z.object({
        type: validateSelectWithEnum(productTypes).optional(),
        skuCode: validateCode(
          (value) => !isNaN(extractProductSKUCode(value))
        ).optional(),
      })
    )
    .query<{
      defaultValue: ProductForm;
      categories: { label: string; value: string }[];
      units: { label: string; value: string }[];
    }>(async ({ input }) => {
      let defaultValue = ProductForm.initial;
      defaultValue.skuCode = await findNextProductSKUCode();

      const categories = (await findAllProductCategory()).map(
        (productCategory) => ({
          label: `${productCategory.reff} | ${productCategory.name}`,
          value: productCategory.reff,
        })
      );

      let units = ProductForm.productUnitOptions;
      if (input.type === "Sparepart") units = ProductForm.sparepartUnitOptions;
      else if (input.type === "ATK") units = ProductForm.atkUnitOptions;

      if (input.skuCode) {
        defaultValue = ProductForm.fromModel(
          await findProductBySKUCode(input.skuCode)
        );
      }

      return { defaultValue, categories, units };
    }),

  save: publicProcedure
    .input(productInput)
    .input(
      z.object({
        skuCode: validateCode(
          (value) => !isNaN(extractProductSKUCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.skuCode === undefined) {
        return await createProduct(await findNextProductSKUCode(), input);
      }
      return await updateProduct(input.skuCode, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        skuCode: validateCode((value) => !isNaN(extractProductSKUCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteProduct(input.skuCode);
    }),
});
