import ItemStack from "./ItemStack.js";
export default class Item {
    id;
    name;
    icon;
    kind;
    static registry = [];
    recipe;
    constructor(id, name, icon, kind) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.kind = kind;
        Item.registry.push(this);
    }
    setRecipe(recipe) {
        this.recipe = recipe;
        return this;
    }
    toStack() {
        return new ItemStack(this, 1);
    }
    static getRandomIngredient() {
        const ingredients = this.registry.filter((item) => item.kind === "ingredient");
        return ingredients[Math.floor(Math.random() * ingredients.length)];
    }
}
