import { validateCode } from "@/server/validation";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  COAForm,
  COATableRow,
  extractCOANumber,
  mainCOAInput,
  sub1COAInput,
  sub2COAInput,
} from "../dtos/coa.dto";
import {
  createCOA,
  deleteCOA,
  findAllCOA,
  findCOAByNumber,
  findNextCOANumber,
  updateCOA,
} from "../stores/coa.store";
import { findAllCurrency } from "../stores/currency.store";
import { publicProcedure, router } from "../trpc";

export const coasRouter = router({
  getTableRows: publicProcedure.query<COATableRow[]>(async () => {
    return (await findAllCOA()).flatMap((coa) =>
      COATableRow.fromMainModel(coa)
    );
  }),

  getNextCOANumber: publicProcedure.query(
    async () => await findNextCOANumber()
  ),

  getCOAs: publicProcedure.query(async () => {
    return await findAllCOA();
  }),

  getCurrencies: publicProcedure.query(() => {
    return findAllCurrency();
  }),

  getCOAForm: publicProcedure
    .input(
      validateCode((code) => {
        const { main, sub1, sub2 } = extractCOANumber(code);
        return !(
          isNaN(main) ||
          (sub1 !== undefined && isNaN(sub1)) ||
          (sub2 !== undefined && isNaN(sub2))
        );
      }).optional()
    )
    .query<COAForm | null>(async ({ input }) => {
      if (input) {
        const { main, sub1, sub2 } = extractCOANumber(input);

        const mainCOA = await findCOAByNumber(main);
        if (!sub1) return COAForm.fromMainModel(mainCOA);

        if (sub1 > mainCOA.subs.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
          });
        }
        const sub1COA = mainCOA.subs[sub1 - 1];
        if (!sub2) return COAForm.fromSub1Model(sub1COA, sub1, mainCOA);

        if (sub2 > sub1COA.subs.length) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 1 COA with number ${main}.${sub1}.${sub2} is not exists`,
          });
        }

        return COAForm.fromSub2Model(
          sub1COA.subs[sub2 - 1],
          sub2,
          sub1COA,
          sub1,
          mainCOA
        );
      }
      return null;
    }),

  saveMain: publicProcedure
    .input(mainCOAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main } = extractCOANumber(code);
          return !isNaN(main);
        }).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.number !== undefined) {
        const { main } = extractCOANumber(input.number);

        const mainCOA = await findCOAByNumber(main);

        return await updateCOA(mainCOA.number, input, mainCOA.subs);
      }
      return await createCOA(await findNextCOANumber(), input);
    }),

  saveSub1: publicProcedure
    .input(sub1COAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1 } = extractCOANumber(code);
          return !(isNaN(main) || (sub1 !== undefined && isNaN(sub1)));
        }).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.number !== undefined) {
        const { main, sub1 } = extractCOANumber(input.number);

        const mainCOA = await findCOAByNumber(main);
        if (mainCOA.subs.length < sub1!) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
          });
        }

        const sub1COA = mainCOA.subs[sub1! - 1];
        sub1COA.description = input.sub1Description;
        // sub1COA.status = true;

        if (input.main !== mainCOA.number) {
          mainCOA.subs = mainCOA.subs.filter(
            (_, subIndex) => subIndex + 1 !== sub1
          );
          await updateCOA(main, { ...mainCOA, type: "Main" }, mainCOA.subs);

          const newMainCOA = await findCOAByNumber(input.main);
          newMainCOA.subs.push(sub1COA);

          return await updateCOA(
            input.main,
            { ...newMainCOA, type: "Main" },
            newMainCOA.subs
          );
        }

        mainCOA.subs[sub1! - 1] = sub1COA;

        return await updateCOA(
          main,
          { ...mainCOA, type: "Main" },
          mainCOA.subs
        );
      }

      const mainCOA = await findCOAByNumber(input.main);

      mainCOA.subs.push({
        description: input.sub1Description,
        status: true,
        subs: [],
      });

      return await updateCOA(
        input.main,
        { ...mainCOA, type: "Main" },
        mainCOA.subs
      );
    }),

  saveSub2: publicProcedure
    .input(sub2COAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1, sub2 } = extractCOANumber(code);
          return !(
            isNaN(main) ||
            (sub1 !== undefined && isNaN(sub1)) ||
            (sub2 !== undefined && isNaN(sub2))
          );
        }).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.number !== undefined) {
        const { main, sub1, sub2 } = extractCOANumber(input.number);

        const mainCOA = await findCOAByNumber(main);
        if (mainCOA.subs.length < sub1!) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
          });
        }

        const sub1COA = mainCOA.subs[sub1! - 1];
        if (sub1COA.subs.length < sub2!) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 2 COA with number ${main}.${sub1}.${sub2} is not exists`,
          });
        }

        const sub2COA = sub1COA.subs[sub2! - 1];
        sub2COA.description = input.sub2Description;
        // sub2COA.status = true;

        if (input.main !== mainCOA.number) {
          mainCOA.subs[sub1! - 1].subs = sub1COA.subs.filter(
            (_, subIndex) => subIndex + 1 !== sub2
          );
          await updateCOA(main, { ...mainCOA, type: "Main" }, mainCOA.subs);

          const newMainCOA = await findCOAByNumber(input.main);
          if (newMainCOA.subs.length < input.sub1) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Sub 1 COA with number ${input.main}.${input.sub1} is not exists`,
            });
          }

          const newSub1COA = newMainCOA.subs[input.sub1 - 1];
          newSub1COA.subs.push(sub2COA);
          newMainCOA.subs[input.sub1 - 1] = newSub1COA;

          return await updateCOA(
            input.main,
            { ...newMainCOA, type: "Main" },
            newMainCOA.subs
          );
        } else if (input.sub1 !== sub1! + 1) {
          mainCOA.subs[sub1! - 1].subs = sub1COA.subs.filter(
            (_, subIndex) => subIndex + 1 !== sub2
          );
          await updateCOA(main, { ...mainCOA, type: "Main" }, mainCOA.subs);

          if (mainCOA.subs.length < sub1!) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
            });
          }

          const newSub1COA = mainCOA.subs[input.sub1 - 1];

          newSub1COA.subs.push(sub2COA);

          mainCOA.subs[input.sub1 - 1] = newSub1COA;

          return await updateCOA(
            input.main,
            { ...mainCOA, type: "Main" },
            mainCOA.subs
          );
        }

        sub1COA.subs[sub2! - 1] = sub2COA;

        mainCOA.subs[sub1! - 1] = sub1COA;

        return await updateCOA(
          main,
          { ...mainCOA, type: "Main" },
          mainCOA.subs
        );
      }

      const mainCOA = await findCOAByNumber(input.main);

      if (mainCOA.subs.length < input.sub1!) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Sub 1 COA with number ${
            input.main
          }.${input.sub1!} is not exists`,
        });
      }

      const sub1COA = mainCOA.subs[input.sub1! - 1];

      sub1COA.subs.push({
        description: input.sub2Description,
        status: true,
      });

      mainCOA.subs[input.sub1! - 1] = sub1COA;

      return await updateCOA(
        input.main,
        { ...mainCOA, type: "Main" },
        mainCOA.subs
      );
    }),

  delete: publicProcedure
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1, sub2 } = extractCOANumber(code);
          return !(
            isNaN(main) ||
            (sub1 !== undefined && isNaN(sub1)) ||
            (sub2 !== undefined && isNaN(sub2))
          );
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { main, sub1, sub2 } = extractCOANumber(input.number);

      if (sub1 !== undefined) {
        const mainCOA = await findCOAByNumber(main);

        if (mainCOA.subs.length < sub1) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
          });
        }

        if (sub2 !== undefined) {
          if (mainCOA.subs[sub1 - 1].subs.length < sub2) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Sub 2 COA with number ${main}.${sub1}.${sub2} is not exists`,
            });
          }

          mainCOA.subs[sub1 - 1].subs = mainCOA.subs[sub1 - 1].subs.filter(
            (_, sub2Index) => sub2Index !== sub2 - 1
          );
        } else {
          mainCOA.subs = mainCOA.subs.filter(
            (_, sub1Index) => sub1Index !== sub1 - 1
          );
        }

        return updateCOA(main, { ...mainCOA, type: "Main" }, mainCOA.subs);
      } else {
        return deleteCOA(main);
      }
    }),
});
