import { findAllCurrency } from "@/server/stores/currency.store";
import { validateCode } from "@/server/validation";
import { TRPCError } from "@trpc/server";
import { DeepPartial } from "react-hook-form";
import { z } from "zod";
import {
  COAForm,
  COATableRow,
  accountTypes,
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
import { publicProcedure, router } from "../trpc";

export const coasRouter = router({
  getTableRows: publicProcedure.query<COATableRow[]>(async () => {
    return (await findAllCOA()).flatMap((coa) =>
      COATableRow.fromMainModel(coa)
    );
  }),

  getForm: publicProcedure
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1, sub2 } = extractCOANumber(code);
          return (
            isNaN(main) ||
            (sub1 !== undefined && isNaN(sub1)) ||
            (sub2 !== undefined && isNaN(sub2))
          );
        }).optional(),
        type: z.enum(accountTypes),
        main: z.number().optional(),
        sub1: z.number().optional(),
        sub2: z.number().optional(),
        isDefault: z.boolean().default(false),
      })
    )
    .query<{
      value: DeepPartial<COAForm>;
      defaultValue?: COAForm;
      mainCOAs: { label: string; value: number }[];
      sub1COAs: { label: string; value: number }[];
      currencies: { label: string; value: string }[];
    }>(async ({ input }) => {
      const currencies = findAllCurrency().map((currency) => ({
        label: currency,
        value: currency,
      }));

      let defaultValue = undefined;
      if (input.isDefault) {
        defaultValue = COAForm.initial(input.type);
        switch (input.type) {
          case "Main":
            defaultValue.main = await findNextCOANumber();
            break;
        }
      }

      let value: DeepPartial<COAForm> = {};

      if (!!input.number) {
        const { main, sub1, sub2 } = extractCOANumber(input.number);

        const mainCOA = await findCOAByNumber(main);

        if (sub1 !== undefined) {
          if (mainCOA.subs.length < sub1) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
            });
          }

          const sub1COA = mainCOA.subs[sub1 - 1];

          if (sub2 !== undefined) {
            if (sub1COA.subs.length < sub2) {
              throw new TRPCError({
                code: "NOT_FOUND",
                message: `Sub 2 COA with number ${main}.${sub1}.${sub2} is not exists`,
              });
            }

            const sub2COA = sub1COA.subs[sub2 - 1];

            value = COAForm.fromSub2Model(
              sub2COA,
              sub2,
              sub1COA,
              sub1,
              mainCOA
            );
          } else {
            value = COAForm.fromSub1Model(sub1COA, sub1, mainCOA);
          }
        } else {
          value = COAForm.fromMainModel(mainCOA);
        }
      }

      const mainCOAs =
        input.type !== "Main"
          ? (await findAllCOA()).map((coa) => ({
              label: `${coa.number} (${coa.accountName})`,
              value: coa.number,
            }))
          : [];

      const sub1COAs =
        input.type === "Sub 1" && input.main !== undefined && !input.isDefault
          ? (await findCOAByNumber(input.main)).subs.map((sub, index) => ({
              label: `${input.main}.${index + 1} (${sub.description})`,
              value: index + 1,
            }))
          : [];

      // const coa1 = (await findAllSubCoa1()).map((coa1) => ({
      //   label: `${input.number}.${coa1.number}`,
      //   value: coa1.number,
      // }));

      // let defaultValue = await getDefaultValue(input.type ?? "Main Coa");

      // if (input.type === "Main Coa") {
      //   defaultValue.main = await findNextCOANumber();
      // } else if (input.type === "Sub Coa 1") {
      //   defaultValue.main = await findNextSubCoa1Code();
      // } else if (input.type === "Sub Coa 2") {
      //   defaultValue.main = await findNextSubCoa2Code();
      // }

      // if (input.number) {
      //   if (input.type === "Main Coa") {
      //     defaultValue = COAForm.fromMainModel(
      //       await findCOAByNumber(input.number)
      //     );
      //   } else if (input.type === "Sub Coa 1") {
      //     defaultValue = COAForm.fromSub1Model(
      //       await findSubCoa1ByNumber(input.number)
      //     );
      //   } else if (input.type === "Sub Coa 2") {
      //     defaultValue = COAForm.fromSubCoa2Model(
      //       await findSubCoa2ByNumber(input.number)
      //     );
      //   }
      // }

      return { defaultValue, value, mainCOAs, sub1COAs: [], currencies };
    }),

  saveMain: publicProcedure
    .input(mainCOAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main } = extractCOANumber(code);
          return isNaN(main);
        }).optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.number !== undefined) {
        const { main } = extractCOANumber(input.number);

        return await updateCOA(main, input);
      }
      return await createCOA(100, input);
    }),

  saveSub1: publicProcedure
    .input(sub1COAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1 } = extractCOANumber(code);
          return isNaN(main) || (sub1 !== undefined && isNaN(sub1));
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

        if (input.main && input.main !== mainCOA.number) {
          mainCOA.subs = mainCOA.subs.filter(
            (_, subIndex) => subIndex !== sub1
          );
          await updateCOA(main, mainCOA);

          const newMainCOA = await findCOAByNumber(input.main);

          newMainCOA.subs.push(sub1COA);

          return await updateCOA(input.main, newMainCOA);
        }

        mainCOA.subs[sub1! - 1] = sub1COA;

        return await updateCOA(main, mainCOA);
      }

      const mainCOA = await findCOAByNumber(input.main);
      mainCOA.subs.push({
        description: input.sub1Description,
        status: true,
        subs: [],
      });

      return await updateCOA(input.main, mainCOA);
    }),

  saveSub2: publicProcedure
    .input(sub2COAInput)
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1, sub2 } = extractCOANumber(code);
          return (
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

        if (input.main && input.main !== mainCOA.number) {
          mainCOA.subs[sub1! - 1].subs = sub1COA.subs.filter(
            (_, subIndex) => subIndex !== sub2
          );
          await updateCOA(main, mainCOA);

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

          return await updateCOA(input.main, newMainCOA);
        } else if (input.sub1 && input.sub1 !== sub1! + 1) {
          mainCOA.subs[sub1! - 1].subs = sub1COA.subs.filter(
            (_, subIndex) => subIndex !== sub2
          );
          await updateCOA(main, mainCOA);

          if (mainCOA.subs.length < sub1!) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Sub 1 COA with number ${main}.${sub1} is not exists`,
            });
          }

          const newSub1COA = mainCOA.subs[input.sub1 - 1];

          newSub1COA.subs.push(sub2COA);

          mainCOA.subs[input.sub1 - 1] = newSub1COA;

          return await updateCOA(input.main, mainCOA);
        }

        sub1COA.subs[sub2! - 1] = sub2COA;

        mainCOA.subs[sub1! - 1] = sub1COA;

        return await updateCOA(main, mainCOA);
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

      return await updateCOA(input.main, mainCOA);
    }),

  delete: publicProcedure
    .input(
      z.object({
        number: validateCode((code) => {
          const { main, sub1, sub2 } = extractCOANumber(code);
          return (
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

        return updateCOA(main, mainCOA);
      } else {
        return deleteCOA(main);
      }
    }),
});
