export interface ArrayDiffResult<T> {
    added: T[];
    removed: T[];
    updated: T[];
};

export declare function smartArrayDiff<T>(
    oldArr: T[],
    newArr: T[],
    getKey?: (item: T) => any
): ArrayDiffResult<T>;

export default smartArrayDiff;