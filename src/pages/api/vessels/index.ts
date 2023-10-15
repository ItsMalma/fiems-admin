import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponsePayload } from "@/libs/utils";
import { VesselModel, VesselOutput } from "@/models/vessel.model";
import connect from "@/libs/mongodb";
import { validateVesselSave } from "@/validations/vessel.validation";
import { CustomerModel, Customer } from "@/models/customer.model";
import moment from "moment";

async function create(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput>>
) {
  // Validasi request body
  const parsedBody = validateVesselSave(req.body);

  // Cek apakah hasil validasi error
  if (parsedBody.error) {
    return res.status(400).json(parsedBody);
  }

  // Ambil data shipping dengan code yang sesuai dari request
  const shipping = await CustomerModel.findOne({
    type: "shipping",
    code: parsedBody.data.shipping,
  });

  // Cek apakah data shipping tidak ada
  if (!shipping) {
    return res.status(404).json({
      data: null,
      error: `No shipping with code ${parsedBody.data.shipping}`,
    });
  }

  // Ambil data vessel terakhir
  const lastVessel = await VesselModel.findOne().sort({
    _id: -1,
  });

  // Buat data vessel baru dan isi semua datanya dengan request
  let vessel = new VesselModel();
  vessel._id = (lastVessel?.id ?? 0) + 1;
  vessel.shipping = shipping._id;
  vessel.name = parsedBody.data.name;
  vessel.capacity = parsedBody.data.capacity;
  vessel.unit = parsedBody.data.unit;
  vessel.status = true;

  // Simpan data vessel ke db
  vessel = await vessel.save();

  return res.status(201).json({
    data: {
      id: vessel.id,
      shipping: {
        code: shipping.code,
        name: shipping.name,
      },
      name: vessel.name,
      capacity: vessel.capacity,
      unit: vessel.unit,
      createDate: moment(vessel.createDate).format("DD/MM/YYYY"),
      status: vessel.status,
    },
    error: null,
  });
}

async function findAll(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput[]>>
) {
  // Ambil semua data vessel dari db
  // lakukan populate untuk mengambil data shipping yang bersangkutan dengan data vessel
  const vessels = await VesselModel.find().populate<{ shipping: Customer }>(
    "shipping"
  );

  return res.status(200).json({
    data: vessels.map((vessel) => ({
      id: vessel.id,
      shipping: {
        code: vessel.shipping.code,
        name: vessel.shipping.name,
      },
      name: vessel.name,
      capacity: vessel.capacity,
      unit: vessel.unit,
      createDate: moment(vessel.createDate).format("DD/MM/YYYY"),
      status: vessel.status,
    })),
    error: null,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponsePayload<VesselOutput | VesselOutput[]>>
) {
  // Koneksikan ke db
  await connect();

  // Cek request method dan panggil function yang sesuai
  switch (req.method) {
    case "POST":
      return await create(req, res);
    case "GET":
      return await findAll(req, res);
    default:
      return res.status(405).json({
        data: null,
        error: "Method not allowed",
      });
  }
}
