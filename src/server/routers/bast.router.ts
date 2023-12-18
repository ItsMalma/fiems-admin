import { BASTTableRow, bastValidationSchema } from "../dtos/bast.dto";
import {
  createBAST,
  findAllBAST,
  findNextBASTNumber,
} from "../stores/bast.store";
import { findAllSuratJalan } from "../stores/suratJalan.store";
import { publicProcedure, router } from "../trpc";

export const bastRouter = router({
  getNextNumber: publicProcedure.query(async () => await findNextBASTNumber()),

  save: publicProcedure
    .input(bastValidationSchema)
    .mutation(async ({ input }) => {
      return await createBAST(input);
    }),

  getSuratJalanOptions: publicProcedure.query(async ({}) => {
    return (await findAllSuratJalan())
      .filter((sj) => sj.bast === null)
      .map((sj) => ({
        label: sj.number,
        value: sj.number,
      }));
  }),

  getTableRows: publicProcedure.query<BASTTableRow[]>(async () => {
    return (await findAllBAST()).map((bast) => ({
      number: bast.number,
      createDate: bast.createDate,
    }));
  }),
});
