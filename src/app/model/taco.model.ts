import {Ingredient} from "./ingredient.model";

export class Taco {
  public id: number | undefined;
  public tacoOrderId: number | undefined;
  public name: string | undefined;
  public createdAt: string | undefined;
  public ingredients: Ingredient[] | undefined
}
