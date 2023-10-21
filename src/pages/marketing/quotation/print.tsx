import clsx from 'clsx';
import React from 'react'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';

export default function print() {
  const [list, setList] = React.useState<number[]>([0])
  const [text, setText] = React.useState<string[]>(['']);

  const handleTextareaChange = (e:any, index:number) => {
    const textareas = e.target;
    const textarea = [...text]
    textarea[index] = e.target.value
    textareas.style.height = 'auto';
    textareas.style.height = textareas.scrollHeight + 'px';
    setText(textarea);
  };
  return (
    <>
      <div className='flex flex-col w-full text-xs'>
        <div className='w-full flex justify-center'>
          <table>
            <tbody className=''>
              <tr className=''>
                <td className='pb-2 pr-10'><b>Kepada</b></td>
                <td className='pb-2'><b>: </b>
                  <input className='text-sm' type="text" name="" id="" />
                </td>
              </tr>
              <tr className=''>
                <td className='pb-2 pr-10'><b>Up</b></td>
                <td className='pb-2'><b>: </b>
                  <input className='text-sm' type="text" name="" id="" />
                </td>
              </tr>
              <tr className=''>
                <td className='pb-2 pr-10'><b>Email</b></td>
                <td className='pb-2'><b>: </b>
                  <input className='text-sm' type="text" name="" id="" />
                </td>
              </tr>
              <tr className=''>
                <td className='pb-2 pr-10'><b>Dari</b></td>
                <td className='pb-2'><b>: </b>
                  <input className='text-sm' type="text" name="" id="" />
                </td>
              </tr>
              <tr className=''>
                <td className='pb-2 pr-10'><b>Tanggal</b></td>
                <td className='pb-2'><b>: </b>
                  <input className='text-sm' type="text" name="" id="" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='my-6'>
          <p className='text-justify'>
            Dengan Hormat, Bersamaan ini kami dari PT. Chandra EkaJaya Logistik (CEL CARGO) mengajukan penawaran harga baru Jasa Angkut Laut (Container),
dengan Therm of Shiptment sebagai berikut:
          </p>
        </div>
        <div className='w-full flex justify-center'>
          <table className='text-sm'>
            <thead>
              <tr>
                <th className='border py-2 px-9'>No</th>
                <th className='border py-2 px-9'>Tujuan</th>
                <th className='border py-2 px-9'>Rate</th>
                <th className='border py-2 px-9'>Service</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border py-2 px-9 bg-gray-200'>1</td>
                <td className='border py-2 px-9 bg-gray-200'></td>
                <td className='border py-2 px-9 bg-gray-200'></td>
                <td className='border py-2 px-9 bg-gray-200'></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='mt-6'>
          <ul className='list-disc text-sm px-8'>
            {list.map((items, index) => 
              <li key={index}>
                <div className='flex gap-1 print:gap-0'>
                  <textarea
                    className="resize-none w-full h-auto p-[2px] print:p-0 print:border-none border border-gray-300 rounded-md print:placeholder-transparent"
                    rows={1}
                    value={text[index]}
                    onChange={(e) => handleTextareaChange(e, index)}
                    placeholder="Enter new term"
                  ></textarea>
                </div>
              </li>
            )}
            <li className='list-none w-full flex justify-center gap-3 mt-1 print:hidden' >
              <span className='' onClick={() => setList([...list, list.length + 1])}>  
                <PlusCircle size={12}/>
              </span>
              <span className='print:hidden' onClick={() => setList(list.slice(0, -1))}>
                <DashCircle size={12}/>
              </span>
            </li>
            <li className='mt-1 font-bold'>Harga exclude PPN 1%</li>
            <li className='mt-1 font-bold'>Harga berlaku perstuffing tanggal 15/10/23</li>
            <li className='mt-1 font-bold'>Biaya transportasi ditanggung PT SAYAP MAS UTAMA</li>
            <li className='mt-1 font-bold'>Term of Payment/jatuh tempo pembayaran 2 minggu setelah tukar faktur</li>
          </ul>
          <p className='text-sm mt-3'>Demikian surat penawaran ini kami sampaikan atas perhatian dan kerjasamanya kami ucapkan terimakasih.</p>
          <div className='w-full flex justify-end'>
            <div className="mt-6">
              <p className='text-sm mt-3'>Alamat, 1 Januari 2021</p>
              <p className='text-sm mt-3 text-center font-bold'>Marketing</p>
              <p className='text-sm mt-20 text-center '>&#40;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#46;&#41;</p>
            </div>
          </div>
          <p className='font-semibold underline mt-12 text-sm'>Note : Setelah Disetujui mohon agar diparaf, difax/diemail kembali kepada kami</p>
        </div>
      </div>
    </>
  )
}
