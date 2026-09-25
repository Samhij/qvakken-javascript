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

    getTotalPoints(): number {
        if (this.items.length === 0) return 0;

        return this.items.reduce(
            (total, stack) => total + (stack.item.points ?? 0) * stack.count,
            0,
        );
    }

    addOrUpdateStack(stack: ItemStack): void {
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

    removeStack(stack: ItemStack): void {
        const list =
            stack.item.kind === "ingredient" ? this.ingredients : this.items;
        const existingStack = list.find(
            (itemStack) => itemStack.item === stack.item,
        );
        if (!existingStack) return;

        existingStack.count -= stack.count;
        if (existingStack.count <= 0) {
            list.splice(list.indexOf(existingStack), 1);
        }
    }
}
