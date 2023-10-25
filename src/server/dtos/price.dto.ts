export class PriceVendorTableRow {
  constructor(
    public createDate: string,
    public customer: string,
    public route: string,
    public containerSize: string,
    public containerType: string,

    public status: boolean
  ) {}
}
