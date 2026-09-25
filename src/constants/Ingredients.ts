import Item from "../models/Item.js";

export default class Ingredients {
    public static TOKEN = new Item(0, "Token", "token.png", "ingredient");
    public static LLM = new Item(1, "LLM", "llm.png", "ingredient");
}