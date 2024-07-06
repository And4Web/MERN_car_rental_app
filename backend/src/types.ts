export type UserType = {
  username: string;
  password: string
}
export type CarType = {
  name: string;
  image: string;
  capacity: number;
  fuelType: string;
  bookedTimeSlots: {from:string; to:string}[],
  rentPerHour: number;
}

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: string;
}