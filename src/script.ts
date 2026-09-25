import Item from "./models/Item.js";
import Inventory from "./models/Inventory.js";
import "./registry/Items.js";
import { getNormalizedMousePos } from "./lib/mouse.js";
import { renderInventory } from "./lib/inventoryUI.js";
import { renderCraftingRecipes } from "./lib/craftingUI.js";

declare function confetti(options?: Record<string, unknown>): void;

const inventory = new Inventory([], []);

function setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
        let timeLeft = 60;
        const countdownElement = document.getElementById("countdown");

        if (countdownElement) {
            countdownElement.textContent = timeLeft.toString();
        }

        const timerInterval = setInterval(() => {
            timeLeft--;

            if (countdownElement) {
                countdownElement.textContent = timeLeft.toString();
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);

                const button = document.getElementById(
                    "collectIngredient",
                ) as HTMLButtonElement;

                button.disabled = true;
                button.style.cursor = "not-allowed";
                button.style.backgroundColor = "gray";

                const craftingContainer =
                    document.getElementById("craftingContainer");
                if (craftingContainer) {
                    craftingContainer.style.pointerEvents = "none";
                    craftingContainer.style.opacity = "0.5";
                }
            }
        }, 1000);
    });

    document.addEventListener("click", () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: getNormalizedMousePos(),
        });
    });

    document
        .getElementById("collectIngredient")
        ?.addEventListener("click", () => {
            const ingredient = Item.getRandomIngredient();
            inventory.addOrUpdateStack(ingredient.toStack());

            renderInventory(inventory);
            renderCraftingRecipes(inventory);
        });

    document.getElementById("test")?.addEventListener("click", () => {
        console.log("receipe clicked");
    });

    const pointsSpan = document.getElementById("points") as HTMLSpanElement;
    pointsSpan.textContent = inventory.getTotalPoints().toString();
}

setupEventListeners();
renderInventory(inventory);
renderCraftingRecipes(inventory);
