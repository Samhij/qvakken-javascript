import Inventory from "./Inventory.js";
import Item from "./Item.js";
import ItemStack from "./ItemStack.js";

export default class CraftingRecipe {
    constructor(
        public inputs: ItemStack[],
        public outputItemId: number,
    ) {}

    canCraft(inventory: Inventory): boolean {
        return this.inputs.every((input) => {
            const stack = inventory.ingredients.find(
                (ingredientStack) => ingredientStack.item === input.item,
            );
            return (stack?.count ?? 0) >= input.count;
        });
    }

    craft(inventory: Inventory): void {
        if (!this.canCraft(inventory)) return;

        for (const input of this.inputs) {
            inventory.removeStack(input);
        }

        const outputItem = Item.registry.find(
            (item) => item.id === this.outputItemId,
        );
        if (outputItem) {
            inventory.addOrUpdateStack(outputItem.toStack());
        }
    }
}
