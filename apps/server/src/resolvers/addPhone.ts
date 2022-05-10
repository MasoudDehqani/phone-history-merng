import { PhoneDocument } from "../model/phone";

export default async function addPhoneResolver(parent, args) {
  const newPhone = new PhoneDocument({
    brand: args.brand,
    model: args.model,
    priceRange: args.priceRange,
    reviewsCount: 0,
    avgRate: 0
  });
  return newPhone.save();
}
