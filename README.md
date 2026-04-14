# How Blocks Connect Between CSS and JavaScript

# Idea
Blocks in the game are styled using CSS classes that are added from JavaScript.


# 1. JavaScript Side (Adding Classes)

In JavaScript, each tile gets a class name like this:

tile.className = "tile " + type;

e.g:
# code:
tile.className = "tile " + type;

# js:
type = "grass-block"

# HTML:
 <!-- <div class="tile grass-block"></div> -->


-------------------------------------------------------

# How Mining Works

When you click on a block, the game checks the selected tool and the block type.

Each tool can only break specific blocks:

 Axe → wood blocks  
 Pickaxe → stone blocks  
 Shovel → dirt and grass blocks  



# Code Example

# js  e.g:
if (currentTool) {
    if (
        (currentTool === "axe" && type === "wood-block") ||
        (currentTool === "pickaxe" && type === "stone-block") ||
        (currentTool === "shovel" && (type === "dirt-block" || type === "grass-block"))
    ) {
        inventory.push(type);
        worldData[r][c] = 0;

        renderWorld();
        renderInventory();
    }
}
