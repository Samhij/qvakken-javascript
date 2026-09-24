import CraftingRecipe from "./CraftingRecipe.js";
import Inventory from "./Inventory.js";
import ItemStack from "./ItemStack.js";

export default class Item {
    public static registry: Item[] = [];
    public recipe?: CraftingRecipe;

    constructor(
        public id: number,
        public name: string,
        public icon: string,
        public kind: "ingredient" | "item",
    ) {
        Item.registry.push(this);
    }

    setRecipe(recipe: CraftingRecipe): this {
        this.recipe = recipe;
        return this;
    }

    toStack(): ItemStack {
        return new ItemStack(this, 1);
    }

    static getRandomIngredient(): Item {
        const ingredients = this.registry.filter(
            (item) => item.kind === "ingredient",
        );
        return ingredients[Math.floor(Math.random() * ingredients.length)];
    }
}
