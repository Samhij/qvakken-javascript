import Item from "./Item.js";

export default class ItemStack {
    constructor(
        public item: Item,
        public count: number,
    ) {}
}
