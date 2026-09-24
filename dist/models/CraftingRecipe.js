export default class CraftingRecipe {
    inputs;
    outputItemId;
    constructor(inputs, outputItemId) {
        this.inputs = inputs;
        this.outputItemId = outputItemId;
    }
    canCraft(inventory) {
        const ingredients = inventory.ingredients;
        return this.inputs.every((stack) => (ingredients[stack.item.id]?.count || 0) >= stack.count);
    }
}
