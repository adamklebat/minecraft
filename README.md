# Block Game

## Idea
A simple block game where you can mine and place blocks.

---

## How Blocks Work

JavaScript gives each block a class:

```js
tile.className = "tile " + type;
```

Example:
```js
type = "grass-block";
```

HTML:
```html
<div class="tile grass-block"></div>
```

CSS controls how blocks look:

```css
.grass-block { background: green; }
.stone-block { background: gray; }
.wood-block { background: brown; }
.sky { background: lightblue; }
```

---

## Mining

Click a block to mine it using tools.

Tools:
- Axe → wood
- Pickaxe → stone
- Shovel → dirt/grass

---

## Code

```js
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
```

---


- You can mine and place blocks  
