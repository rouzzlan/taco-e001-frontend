import {Taco} from "./taco.model";

export class TacoOrder {
  id: number | undefined;
  placedAt: string | undefined;
  deliveryName: string | undefined;
  deliveryStreet: string | undefined;
  deliveryCity: string | undefined;
  deliveryState: string | undefined;
  deliveryZip: string | undefined;
  ccNumber: string | undefined;
  ccExpiration: string | undefined;
  ccCVV: string | undefined;
  email: string | undefined;
  tacos: Taco[] | undefined;
  orderer_id: string | undefined;
}
