export default class Inventory {
    ingredients;
    items;
    constructor(ingredients, items) {
        this.ingredients = ingredients;
        this.items = items;
    }
    hasItem(item) {
        return this.items.some((itemStack) => itemStack.item === item);
    }
    addItem(stack) {
        const list = stack.item.kind === "ingredient" ? this.ingredients : this.items;
        const existingStack = list.find((itemStack) => itemStack.item === stack.item);
        if (existingStack) {
            existingStack.count += stack.count;
        }
        else {
            list.push(stack);
        }
    }
}
