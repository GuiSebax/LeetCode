function construct2DArray(original: number[], m: number, n: number): number[][] {

    if (original.length !== m * n)
        return []


    const result: number[][] = []

    for (let i = 0; i < m; i++) {
        const row = original.slice(i * n, i * n + n)
        result.push(row)
    }

    return result
};