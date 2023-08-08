export function setLeftValue(e) {
    e.preventDefault();

    const titleMin = document.getElementById('title-min');
    const inputRight = document.getElementById('input-right');
    const dotLeft = document.getElementById('dot-left');
    const sliderRange = document.getElementById('slider-range');

    let value = this.value;
    let min = parseInt(this.min);
    let max = parseInt(this.max);

    value = Math.min(parseInt(value), parseInt(inputRight.value) - 1);

    let percent = ((value - min) / (max - min)) * 100;

    sliderRange.style.left = percent + '%';
    dotLeft.style.left = percent + '%';
    titleMin.innerText = value;
}

export function setRightValue(e) {
    e.preventDefault();

    const titleMax = document.getElementById('title-max');
    const inputLeft = document.getElementById('input-left');
    const dotRight = document.getElementById('dot-right');
    const sliderRange = document.getElementById('slider-range');

    let value = this.value;
    let min = parseInt(this.min);
    let max = parseInt(this.max);

    value = Math.max(parseInt(value), parseInt(inputLeft.value) + 1);

    let percent = ((value - min) / (max - min)) * 100;

    sliderRange.style.right = (100 - percent) + '%';
    dotRight.style.right = (100 - percent) + '%';
    titleMax.innerText = value;
}