# Run the website using Python
```bash
python -m http.server 8000
```

# Exercise 4.4 – Loading Data from CSV with D3.js

In this exercise, we load tabular data from a CSV file into D3, convert column data types from strings to numbers, compute basic summary statistics with D3 array methods, sort the dataset, and pass the parsed data to a chart function.

## Folder Structure

```
Exercise 4.4/
├── index.html               ← Webpage containing the exercise task
├── README.md                ← Exercise documentation
├── data/
│   └── tvBrandCount.csv     ← CSV dataset containing TV brand counts
└── assets/
    ├── css/
    │   └── style.css        ← Stylesheet
    └── js/
        └── d3-main.js       ← Exercise 4.4 D3 CSV loading & processing
```

## Exercise Steps & Implementation Details

All D3 loading and processing logic is implemented in [`assets/js/d3-main.js`](file:///c:/COS30045-Data-Visualization/Exercise%204/Exercise%204.4/assets/js/d3-main.js).

### Step 1 & 2: Row Conversion Function (`d3.csv`)
By default, `d3.csv()` reads all column values as strings. We pass a row accessor function as the second parameter to transform each row during import:
```javascript
d3.csv("../data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // The unary plus (+) operator casts string to number
  };
}).then(data => {
  console.log("Raw loaded data:", data);
  // ...
});
```

### Step 3: Dataset Summary Statistics
Using D3 array helper functions within the `.then()` promise callback:
```javascript
console.log("Dataset length:", data.length);
console.log("Max count (d3.max):", d3.max(data, d => d.count));
console.log("Min count (d3.min):", d3.min(data, d => d.count));
console.log("Extent [min, max] (d3.extent):", d3.extent(data, d => d.count));
```

### Sorting Data
To make the data interpretable, we sort the array in descending order based on `count`:
```javascript
data.sort((a, b) => b.count - a.count);
console.log("Sorted data (descending by count):", data);
```

### Passing Data to Visualization
We invoke `drawBarChart(data)` within the `.then()` promise, preparing for Exercise 4.5:
```javascript
drawBarChart(data);
```

## Expected Console Output

When opening the browser console (`F12`):
- `data`: Array of 25 objects `{ brand: "...", count: <number> }`
- `data.length`: `25`
- `d3.max`: `1096` (Samsung)
- `d3.min`: `24` (Skyworth / Walton)
- `d3.extent`: `[24, 1096]`
- Sorted array: Starting with `samsung (1096)`, `kogan (788)`, `lg (677)`, etc.
- `drawBarChart called with data: [...]`
