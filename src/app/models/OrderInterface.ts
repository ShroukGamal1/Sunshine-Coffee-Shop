import { CartInterface } from "./CartInterface";

export interface OrderInterface {
    id: number,
    state: string,
    totalPrice: number,
    userId: number,
    products:CartInterface[]
}
