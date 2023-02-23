export function shuffleArray<T>(array: T[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function findNeighboursSum(array: number[][], indexX: number, indexY: number) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        if (indexX + i >= array.length || indexX + i < 0) {
            continue;
        }
        const cloumn: number[] = array[indexX + i];
        if(cloumn === undefined) {
            console.log(cloumn);
        }
        for (let j = -1; j < 2; j++) {
            if (indexY + j >= cloumn.length || indexY + j < 0) {
                continue;
            } else {
                sum += array[indexX + i][indexY + j];
            }
        }
    }
    sum -= array[indexX][indexY]; // removing it's own life value
    return sum;
}