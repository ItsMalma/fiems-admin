import { z } from "zod";
import {
  ProductCategoryForm,
  ProductCategoryTableRow,
  extractProductCategoryReff,
  productCategoryInput,
} from "../dtos/productCategory.dto";
import {
  createProductCategory,
  deleteProductCategory,
  findAllProductCategory,
  findNextProductCategoryReff,
  findProductCategoryByReff,
  updateProductCategory,
} from "../stores/productCategory.store";
import { publicProcedure, router } from "../trpc";
import { validateCode } from "../validation";

export const productCategoriesRouter = router({
  getTableRows: publicProcedure.query<ProductCategoryTableRow[]>(async () => {
    return (await findAllProductCategory()).map((productCategory) =>
      ProductCategoryTableRow.fromModel(productCategory)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        reff: validateCode(
          (value) => !isNaN(extractProductCategoryReff(value))
        ).optional(),
      })
    )
    .query<ProductCategoryForm>(async ({ input }) => {
      let defaultValue = ProductCategoryForm.initial;
      defaultValue.reff = await findNextProductCategoryReff();

      if (input.reff) {
        defaultValue = ProductCategoryForm.fromModel(
          await findProductCategoryByReff(input.reff)
        );
      }

      return defaultValue;
    }),

  save: publicProcedure
    .input(productCategoryInput)
    .input(
      z.object({
        reff: validateCode(
          (value) => !isNaN(extractProductCategoryReff(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.reff === undefined) {
        return await createProductCategory(
          await findNextProductCategoryReff(),
          input
        );
      }
      return await updateProductCategory(input.reff, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        reff: validateCode(
          (value) => !isNaN(extractProductCategoryReff(value))
        ),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteProductCategory(input.reff);
    }),
});
