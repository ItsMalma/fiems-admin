import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  CoaForm,
  CoaTableRow,
  extractCoaCode,
  coaInput,
  accountTypes,
  AccountType,
} from "../dtos/coa.dto";
import {
  findAllMainCoa,
  findAllSubCoa1,
  findAllSubCoa2,
  findNextMainCoaCode,
  findMainCoaByNumber,
  findNextSubCoa1Code,
  findNextSubCoa2Code,
  findSubCoa1ByNumber,
  findSubCoa2ByNumber,
  createMainCoa,
  deleteCoa,
  updateCoa,
} from "../stores/coa.store";
import { publicProcedure, router } from "../trpc";

const getDefaultValue = async (
  accountType: AccountType
): Promise<CoaForm> => {
  return {
    createDate: new Date(),
    accountType: accountType,
    number: await findNextMainCoaCode(),
    description: "",
    type: "",
    category: "",
    transaction: "",
    currency: "",

  };
};

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
        type: z.enum(accountTypes).optional(),
      })
    )
    .query<{
      defaultValue: CoaForm;
      coa1: { label: string; value: string }[];
    }>(async ({ input }) => {

      const coa1 = (await findAllSubCoa1()).map((coa1) => ({
        label: `${input.number}.${coa1.number}`,
        value: coa1.number,
      }));

      let defaultValue = await getDefaultValue(input.type ?? "Main Coa");
      
      if(input.type === "Main Coa") {
        defaultValue.number = await findNextMainCoaCode();
      } else if(input.type === "Sub Coa 1") {
        defaultValue.number = await findNextSubCoa1Code();
      } else if(input.type === "Sub Coa 2") {
        defaultValue.number = await findNextSubCoa2Code();
      }

      if (input.number) {
        if(input.type === "Main Coa") {
          defaultValue = CoaForm.fromMainCoaModel(await findMainCoaByNumber(input.number));
        } else if(input.type === "Sub Coa 1") {
          defaultValue = CoaForm.fromSubCoa1Model(await findSubCoa1ByNumber(input.number));
        } else if(input.type === "Sub Coa 2") {
          defaultValue = CoaForm.fromSubCoa2Model(await findSubCoa2ByNumber(input.number));
        }
      }

      return { defaultValue, coa1 };
    }),

  save: publicProcedure
    .input(coaInput)
    .input(
      z.object({
        number: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {

      const type = input.type as AccountType;

      if (input.number === undefined) {
          return await createMainCoa(type,await findNextMainCoaCode(), input,);
      }
      return await updateCoa(type, input.number, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        type: z.enum(accountTypes),
        number: validateCode((value) => !isNaN(extractCoaCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteCoa(input.type ,input.number);
    }),
});
