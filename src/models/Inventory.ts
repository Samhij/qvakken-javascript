import Item from "./Item.js";
import ItemStack from "./ItemStack.js";

export default class Inventory {
    constructor(
        public ingredients: ItemStack[],
        public items: ItemStack[],
    ) {}

    hasItem(item: Item): boolean {
        return this.items.some((itemStack) => itemStack.item === item);
    }

    addItem(stack: ItemStack): void {
        const list =
            stack.item.kind === "ingredient" ? this.ingredients : this.items;
        const existingStack = list.find(
            (itemStack) => itemStack.item === stack.item,
        );
        if (existingStack) {
            existingStack.count += stack.count;
        } else {
            list.push(stack);
        }
    }
}
