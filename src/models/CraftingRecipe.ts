import Inventory from "./Inventory.js";
import ItemStack from "./ItemStack.js";

export default class CraftingRecipe {
    constructor(
        public inputs: ItemStack[],
        public outputItemId: number,
    ) {}

    canCraft(inventory: Inventory): boolean {
        const ingredients = inventory.ingredients;
        return this.inputs.every(
            (stack) => (ingredients[stack.item.id]?.count || 0) >= stack.count,
        );
    }
}
