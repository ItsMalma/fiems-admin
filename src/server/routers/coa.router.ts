import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  CoaForm,
  CoaTableRow,
  extractCoaCode,
  coaInput,
} from "../dtos/coa.dto";
import {
  createCoa,
  deleteCoa,
  findAllCoa,
  findNextCoaCode,
  findCoaByCode,
  updateCoa,
  findAllMainCoa,
  findAllSubCoa1,
  findAllSubCoa2,
} from "../stores/coa.store";
import { publicProcedure, router } from "../trpc";

export const coaRouter = router({
  getTableRows: publicProcedure.query<CoaTableRow[]>(async (opts) => {
    return [
      ...(await findAllMainCoa()).map((mainCoa) =>
      CoaTableRow.fromMainCoaModel(mainCoa)
    ),
      ...(await findAllSubCoa1()).map((subCoa1) =>
      CoaTableRow.fromSubCoa1Model(subCoa1)
    ),
      ...(await findAllSubCoa2()).map((subCoa2) =>
      CoaTableRow.fromSubCoa2Model(subCoa2)
    ),
  ];
  }),

  getForm: publicProcedure
    .input(
      z.object({
        number: z.string().optional(),
      })
    )
    .query<{
      defaultValue: CoaForm;
    }>(async ({ input }) => {
      let defaultValue = CoaForm.initial;
      defaultValue.number = await findNextCoaCode();

      if (input.number) {
        defaultValue = CoaForm.fromModel(await findCoaByCode(input.number));
      }

      return { defaultValue };
    }),

  save: publicProcedure
    .input(coaInput)
    .input(
      z.object({
        number: validateCode(
          (value) => !isNaN(extractCoaCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.number === undefined) {
        return await createCoa(await findNextCoaCode(), input);
      }
      return await updateCoa(input.number, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        number: validateCode((value) => !isNaN(extractCoaCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteCoa(input.number);
    }),
});
