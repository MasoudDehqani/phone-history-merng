import { PhoneDocument } from "../model/phone"

export default async function deletePhoneResolver(parent, args) {
  const res = await PhoneDocument.deleteOne({ _id: args.phoneId })
  return res.deletedCount
}