export function delArrayItem(arr, index) {
    let frontPart = arr.slice(0, index);
    let lastPart = arr.slice(index + 1);
    return [...frontPart, ...lastPart]
}