import { z } from "zod";
import {
  CustomerForm,
  CustomerPic,
  CustomerTableRow,
  CustomerType,
  customerInput,
  customerTypes,
  extractCustomerCode,
} from "../dtos/customer.dto";
import { findAllCurrency } from "../stores/currency.store";
import {
  createCustomer,
  deleteCustomer,
  findAllFactory,
  findAllShipping,
  findAllVendor,
  findFactoryByCode,
  findNextCustomerCode,
  findShippingByCode,
  findVendorByCode,
  updateCustomer,
} from "../stores/customer.store";
import { findAllCustomerGroup } from "../stores/customerGroup.store";
import {
  findAllCityByProvince,
  findAllProvince,
} from "../stores/province.store";
import { publicProcedure, router } from "../trpc";
import { validateCode } from "../validation";

const getDefaultValue = async (
  customerType: CustomerType
): Promise<CustomerForm> => {
  return {
    createDate: new Date(),
    type: customerType,
    code: await findNextCustomerCode(customerType),
    name: "",
    address: "",
    province: "",
    city: "",
    telephone: "",
    fax: "",
    email: "",
    top: 0,
    currency: "",
    purchasing: CustomerPic.default,
    operation: CustomerPic.default,
    finance: CustomerPic.default,
  };
};

export const customersRouter = router({
  getTableRows: publicProcedure.query<CustomerTableRow[]>(async (opts) => {
    return [
      ...(await findAllFactory()).map((factory) =>
        CustomerTableRow.fromFactoryModel(factory)
      ),
      ...(await findAllVendor()).map((vendor) =>
        CustomerTableRow.fromVendorModel(vendor)
      ),
      ...(await findAllShipping()).map((shipping) =>
        CustomerTableRow.fromShippingModel(shipping)
      ),
    ];
  }),

  getForm: publicProcedure
    .input(
      z.object({
        type: z.enum(customerTypes).optional(),
        code: z.string().optional(),
        province: z.string().optional(),
      })
    )
    .query<{
      defaultValue: CustomerForm;
      groups: { label: string; value: string }[];
      provinces: { label: string; value: string }[];
      cities: { label: string; value: string }[];
      currencies: { label: string; value: string }[];
    }>(async ({ input }) => {
      const groups = (await findAllCustomerGroup()).map((customerGroup) => ({
        label: `${customerGroup.code} | ${customerGroup.name}`,
        value: customerGroup.code,
      }));

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

      const currencies = findAllCurrency().map((currency) => ({
        label: currency,
        value: currency,
      }));

      let defaultValue = await getDefaultValue(input.type ?? "Factory");

      if (input.code) {
        if (input.type === "Factory") {
          defaultValue = CustomerForm.fromFactoryModel(
            await findFactoryByCode(input.code)
          );
        } else if (input.type === "Vendor") {
          defaultValue = CustomerForm.fromVendorModel(
            await findVendorByCode(input.code)
          );
        } else if (input.type === "Shipping") {
          defaultValue = CustomerForm.fromShippingModel(
            await findShippingByCode(input.code)
          );
        }
      }

      return { defaultValue, groups, provinces, cities, currencies };
    }),

  save: publicProcedure
    .input(customerInput)
    .input(
      z.object({
        code: validateCode(
          (value) => !isNaN(extractCustomerCode(value))
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const type = input.type as CustomerType;

      if (input.code === undefined) {
        return await createCustomer(
          type,
          await findNextCustomerCode(type),
          input
        );
      }
      return await updateCustomer(type, input.code, input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        type: z.enum(customerTypes),
        code: validateCode((value) => !isNaN(extractCustomerCode(value))),
      })
    )
    .mutation(async ({ input }) => {
      return await deleteCustomer(input.type, input.code);
    }),
});
