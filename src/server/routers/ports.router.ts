import {
  findAllCityByProvince,
  findAllProvince,
} from "@/server/stores/province.store";
import { validateCode } from "@/server/validation";
import { z } from "zod";
import {
  PortForm,
  PortTableRow,
  extractPortCode,
  portInput,
} from "../dtos/port.dto";
import {
  createPort,
  deletePort,
  findAllPort,
  findNextPortCode,
  findPortByCode,
  updatePort,
} from "../stores/port.store";
import { publicProcedure, router } from "../trpc";

export const portsRouter = router({
  getTableRows: publicProcedure.query<PortTableRow[]>(async () => {
    return (await findAllPort()).map((port) => PortTableRow.fromModel(port));
  }),

  getForm: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
        province: z.string().optional(),
      })
    )
    .query<{
      defaultValue: PortForm;
      provinces: { label: string; value: string }[];
      cities: { label: string; value: string }[];
    }>(async ({ input }) => {
      const provinces = findAllProvince().map((province) => ({
        label: province,
        value: province,
      }));

      const cities = input.province
        ? findAllCityByProvince(input.province).map((city) => ({
            label: city,
            value: city,
          }))
        : [];

      let defaultValue = PortForm.initial;
      defaultValue.code = await findNextPortCode();

      if (input.code) {
        defaultValue = PortForm.fromModel(await findPortByCode(input.code));
      }

      return { defaultValue, provinces, cities };
    }),

  save: publicProcedure
    .input(portInput)
    .input(
      z.object({
        code: validateCode(
          (value) => !isNaN(extractPortCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.code === undefined) {
        return await createPort(await findNextPortCode(), input);
      }
      return await updatePort(input.code, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        code: validateCode((value) => !isNaN(extractPortCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deletePort(input.code);
    }),
});
