import { Prisma } from "@prisma/client";
import moment from "moment";
import { z } from "zod";
import {
  validateAppend,
  validateCode,
  validateDate,
  validateMoney,
  validateSelectWithEnum,
  validateText,
} from "../validation";
import { extractCustomerCode } from "./customer.dto";
import { extractPortCode } from "./port.dto";
import { extractRouteCode } from "./route.dto";

export const priceTypeInput = validateSelectWithEnum(["Vendor", "Shipping"]);

export const priceVendorInput = z.object({
  effectiveStartDate: validateDate(),
  effectiveEndDate: validateDate(),
  vendor: validateCode((code) => !isNaN(extractCustomerCode(code))),
  details: validateAppend(
    z.object({
      id: z.string().optional(),
      route: validateCode((code) => !isNaN(extractRouteCode(code))),
      containerSize: validateText(),
      containerType: validateText(),
      serviceType: validateText(),
      port: validateCode((code) => !isNaN(extractPortCode(code))),
      tracking: validateMoney(),
      buruh: validateMoney(),
      thcOPT: validateMoney(),
      thcOPP: validateMoney(),
      adminBL: validateMoney(),
      cleaning: validateMoney(),
      materai: validateMoney(),
    })
  ),
});
export type PriceVendorInput = z.infer<typeof priceVendorInput>;

export const priceShippingInput = z.object({
  effectiveStartDate: validateDate(),
  effectiveEndDate: validateDate(),
  shipping: validateCode((code) => !isNaN(extractCustomerCode(code))),
  details: validateAppend(
    z.object({
      id: z.string().optional(),
      route: validateCode((code) => !isNaN(extractRouteCode(code))),
      containerSize: validateText(),
      containerType: validateText(),
      serviceType: validateText(),
      port: validateCode((code) => !isNaN(extractPortCode(code))),
      freight: validateMoney(),
      thcOPT: validateMoney(),
      thcOPP: validateMoney(),
      adminBL: validateMoney(),
      cleaning: validateMoney(),
      alihKapal: validateMoney(),
      materai: validateMoney(),
      lolo: validateMoney(),
      segel: validateMoney(),
      rc: validateMoney(),
      lss: validateMoney(),
    })
  ),
});
export type PriceShippingInput = z.infer<typeof priceShippingInput>;

export class PriceVendorTableRow {
  constructor(
    public id: string,
    public detailId: string,
    public createDate: string,
    public vendor: string,
    public route: string,
    public port: string,
    public containerSize: string,
    public containerType: string,
    public serviceType: string,
    public tracking: number,
    public buruh: number,
    public thcOPT: number,
    public thcOPP: number,
    public adminBL: number,
    public cleaning: number,
    public materai: number,
    public total: number,
    public status: boolean
  ) {}

  static fromModel(
    model: Prisma.PriceVendorDetailGetPayload<{
      include: {
        priceVendor: { include: { vendor: true } };
        route: true;
        port: true;
      };
    }>
  ) {
    return new PriceVendorTableRow(
      model.priceVendor.id,
      model.id,
      moment(model.priceVendor.createDate).toString(),
      `${model.priceVendor.vendor.code} (${model.priceVendor.vendor.name})`,
      `${model.route.code} (${model.route.startDescription} - ${model.route.endDescription})`,
      `${model.port.code} (${model.port.name})`,
      model.containerSize,
      model.containerType,
      model.serviceType,
      model.tracking,
      model.buruh,
      model.thcOPT,
      model.thcOPP,
      model.adminBL,
      model.cleaning,
      model.materai,
      model.tracking +
        model.buruh +
        model.thcOPT +
        model.thcOPP +
        model.adminBL +
        model.cleaning +
        model.materai,
      model.priceVendor.status &&
        moment(new Date()).isBetween(
          model.priceVendor.effectiveStartDate,
          model.priceVendor.effectiveEndDate,
          "day",
          "[]"
        )
    );
  }
}

export class PriceShippingTableRow {
  constructor(
    public id: string,
    public detailId: string,
    public createDate: string,
    public shipping: string,
    public route: string,
    public port: string,
    public containerSize: string,
    public containerType: string,
    public serviceType: string,
    public freight: number,
    public thcOPT: number,
    public thcOPP: number,
    public adminBL: number,
    public cleaning: number,
    public alihKapal: number,
    public materai: number,
    public lolo: number,
    public segel: number,
    public rc: number,
    public lss: number,
    public total: number,
    public status: boolean
  ) {}

  static fromModel(
    model: Prisma.PriceShippingDetailGetPayload<{
      include: {
        priceShipping: { include: { shipping: true } };
        route: true;
        port: true;
      };
    }>
  ) {
    return new PriceShippingTableRow(
      model.priceShipping.id,
      model.id,
      moment(model.priceShipping.createDate).toString(),
      `${model.priceShipping.shipping.code} (${model.priceShipping.shipping.name})`,
      `${model.route.code} (${model.route.startDescription} - ${model.route.endDescription})`,
      `${model.port.code} (${model.port.name})`,
      model.containerSize,
      model.containerType,
      model.serviceType,
      model.freight,
      model.thcOPT,
      model.thcOPP,
      model.adminBL,
      model.cleaning,
      model.alihKapal,
      model.materai,
      model.lolo,
      model.segel,
      model.rc,
      model.lss,
      model.freight +
        model.thcOPT +
        model.thcOPP +
        model.adminBL +
        model.cleaning +
        model.alihKapal +
        model.materai +
        model.lolo +
        model.segel +
        model.rc +
        model.lss,
      model.priceShipping.status &&
        moment(new Date()).isBetween(
          model.priceShipping.effectiveStartDate,
          model.priceShipping.effectiveEndDate,
          "day",
          "[]"
        )
    );
  }
}

export class PriceVendorForm {
  constructor(
    public createDate: string | Date,
    public effectiveStartDate: string | Date,
    public effectiveEndDate: string | Date,
    public vendor: string,
    public vendorAddress: string,
    public vendorProvince: string,
    public vendorCity: string,
    public details: {
      id: string;
      route: string;
      routeDescription: string;
      containerSize: string;
      containerType: string;
      serviceType: string;
      port: string;
      tracking: number;
      buruh: number;
      thcOPT: number;
      thcOPP: number;
      adminBL: number;
      cleaning: number;
      materai: number;
      total: number;
    }[]
  ) {}

  static fromModel(
    model: Prisma.PriceVendorGetPayload<{
      include: {
        vendor: true;
        details: {
          include: {
            route: true;
            port: true;
          };
        };
      };
    }>
  ) {
    return new PriceVendorForm(
      moment(model.createDate).toString(),
      moment(model.effectiveStartDate).format("YYYY-MM-DD"),
      moment(model.effectiveEndDate).format("YYYY-MM-DD"),
      model.vendor.code,
      model.vendor.address,
      model.vendor.province,
      model.vendor.city,
      model.details.map((detail) => ({
        id: detail.id,
        route: detail.route.code,
        routeDescription: `${detail.route.startDescription} - ${detail.route.endDescription}`,
        containerSize: detail.containerSize,
        containerType: detail.containerType,
        serviceType: detail.serviceType,
        port: detail.port.code,
        tracking: detail.tracking,
        buruh: detail.buruh,
        thcOPT: detail.thcOPT,
        thcOPP: detail.thcOPP,
        adminBL: detail.adminBL,
        cleaning: detail.cleaning,
        materai: detail.materai,
        total:
          detail.tracking +
          detail.buruh +
          detail.thcOPT +
          detail.thcOPP +
          detail.adminBL +
          detail.cleaning +
          detail.materai,
      }))
    );
  }

  static initialDetail: () => PriceVendorForm["details"][0] = () => ({
    id: "",
    route: "",
    routeDescription: "",
    containerSize: "",
    containerType: "",
    serviceType: "",
    port: "",
    tracking: 0,
    buruh: 0,
    thcOPT: 0,
    thcOPP: 0,
    adminBL: 0,
    cleaning: 0,
    materai: 0,
    total: 0,
  });

  static initial: () => PriceVendorForm = () =>
    new PriceVendorForm(new Date(), new Date(), new Date(), "", "", "", "", [
      this.initialDetail(),
    ]);
}

export class PriceShippingForm {
  constructor(
    public createDate: string | Date,
    public effectiveStartDate: string | Date,
    public effectiveEndDate: string | Date,
    public shipping: string,
    public shippingAddress: string,
    public shippingProvince: string,
    public shippingCity: string,
    public details: {
      id: string;
      route: string;
      routeDescription: string;
      containerSize: string;
      containerType: string;
      serviceType: string;
      port: string;
      freight: number;
      thcOPT: number;
      thcOPP: number;
      adminBL: number;
      cleaning: number;
      alihKapal: number;
      materai: number;
      lolo: number;
      segel: number;
      rc: number;
      lss: number;
      total: number;
    }[]
  ) {}

  static fromModel(
    model: Prisma.PriceShippingGetPayload<{
      include: {
        shipping: true;
        details: {
          include: {
            route: true;
            port: true;
          };
        };
      };
    }>
  ) {
    return new PriceShippingForm(
      moment(model.createDate).toString(),
      moment(model.effectiveStartDate).format("YYYY-MM-DD"),
      moment(model.effectiveEndDate).format("YYYY-MM-DD"),
      model.shipping.code,
      model.shipping.address,
      model.shipping.province,
      model.shipping.city,
      model.details.map((detail) => ({
        id: detail.id,
        route: detail.route.code,
        routeDescription: `${detail.route.startDescription} - ${detail.route.endDescription}`,
        containerSize: detail.containerSize,
        containerType: detail.containerType,
        serviceType: detail.serviceType,
        port: detail.port.code,
        freight: detail.freight,
        thcOPT: detail.thcOPT,
        thcOPP: detail.thcOPP,
        adminBL: detail.adminBL,
        cleaning: detail.cleaning,
        alihKapal: detail.alihKapal,
        materai: detail.materai,
        lolo: detail.lolo,
        segel: detail.segel,
        rc: detail.rc,
        lss: detail.lss,
        total:
          detail.freight +
          detail.thcOPT +
          detail.thcOPP +
          detail.adminBL +
          detail.cleaning +
          detail.alihKapal +
          detail.materai +
          detail.lolo +
          detail.segel +
          detail.rc +
          detail.lss,
      }))
    );
  }

  static initialDetail: () => PriceShippingForm["details"][0] = () => ({
    id: "",
    route: "",
    routeDescription: "",
    containerSize: "",
    containerType: "",
    serviceType: "",
    port: "",
    freight: 0,
    thcOPT: 0,
    thcOPP: 0,
    adminBL: 0,
    cleaning: 0,
    alihKapal: 0,
    materai: 0,
    lolo: 0,
    segel: 0,
    rc: 0,
    lss: 0,
    total: 0,
  });

  static initial: () => PriceShippingForm = () =>
    new PriceShippingForm(new Date(), new Date(), new Date(), "", "", "", "", [
      this.initialDetail(),
    ]);
}
