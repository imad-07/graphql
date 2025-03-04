import {donut, bars} from "./components.js"
export {drawDonutChart, representaudit}

function drawDonutChart(value) { 
    const total = 128 + value;
    const percent = (value / total) * 100;
    let svg = donut(percent,value)
    return svg
}
function representaudit(ratio) {
    let maxWidth = 500;
    let barHeight = 50; 
    let spacing = 10;;
    let svg = bars(maxWidth, barHeight, spacing, ratio)
  return svg
}