import { SelectOption } from "@/components/Elements";

export const ContainerSizes: SelectOption[] = [
  { label: "20 Feet", value: "20 Feet" },
  { label: "21 Feet", value: "21 Feet" },
  { label: "40 Feet", value: "40 Feet" },
  { label: "41 Feet", value: "41 Feet" },
  { label: "40 HC", value: "40 HC" },
];

export const ContainerTypes: SelectOption[] = [
  { label: "Open Door", value: "Open Door" },
  { label: "Open Top", value: "Open Top" },
  { label: "Dry", value: "Dry" },
  { label: "Reefer", value: "Reefer" },
];

export const ServiceTypes: SelectOption[] = [
  { label: "Door to Door", value: "Door to Door" },
  { label: "Door to Port", value: "Door to Port" },
  { label: "Port to Door", value: "Port to Door" },
  { label: "Port to Port", value: "Port to Port" },
  { label: "Door to CY", value: "Door to CY" },
  { label: "Port to CY", value: "Port to CY" },
  { label: "CY to Door", value: "CY to Door" },
  { label: "CY to Port", value: "CY to Port" },
  { label: "CY to CY", value: "CY to CY" },
];

export const TruckTypes: SelectOption[] = [
  { label: "Tronton", value: "Tronton" },
  { label: "Trintin", value: "Trintin" },
  { label: "Trinton", value: "Trinton" },
  { label: "Trailer", value: "Trailer" },
  { label: "Fuso", value: "Fuso" },
  { label: "Engkel", value: "Engkel" },
];

export const QuotationStatus: SelectOption[] = [
  { label: "Include", value: "Include" },
  { label: "Exclude", value: "Exclude" },
  { label: "Tidak Ada", value: "TidakAda" },
];

export const Months: SelectOption[] = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];
