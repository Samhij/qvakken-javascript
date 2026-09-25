import CraftingRecipe from "./CraftingRecipe.js";
import ItemStack from "./ItemStack.js";

export default class Item {
    public static registry: Item[] = [];

    public id: number;
    public icon?: string;
    public recipe?: CraftingRecipe;
    public points?: number;

    constructor(
        public name: string,
        public kind: "ingredient" | "item",
    ) {
        this.id = Item.registry.length;
        Item.registry.push(this);
    }

    setRecipe(inputs: ItemStack[]): this {
        this.recipe = new CraftingRecipe(inputs, this.id);
        return this;
    }

    setIcon(icon: string): this {
        this.icon = icon;
        return this;
    }

    setPoints(points: number): this {
        this.points = points;
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
