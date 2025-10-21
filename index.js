/**
 * smart-array-diff
 * Compare two arrays and return added, removed, and updated items.
 *
 * @param {Array} oldArr - Original array
 * @param {Array} newArr - Updated array
 * @param {(item: any) => any} [getKey] - Optional key extractor for object comparison
 * @returns {{ added: any[], removed: any[], updated: any[] }}
 */
export const smartArrayDiff = (
    oldArr = [],
    newArr = [],
    getKey = null,
) => {
    try {
        const oldMap = new Map();
        const added = [];
        const removed = [];
        const updated = [];
        const useKey = (typeof getKey === "function");

        if (useKey) {
            oldArr?.forEach((item) => oldMap?.set(getKey(item), item));
            newArr?.forEach((item) => {
                const key = getKey(item);
                if (!oldMap?.has(key)) {
                    added.push(item);
                }
                else if (JSON.stringify(oldMap?.get(key)) !== JSON.stringify(item)) {
                    updated.push(item);
                };

                oldMap.delete(key);
            });
            removed.push(...Array.from(oldMap?.values()));
        }
        else {
            const oldSet = new Set(oldArr?.map(JSON.stringify));
            const newSet = new Set(newArr?.map(JSON.stringify));

            newArr?.forEach((item) => {
                const str = JSON.stringify(item);
                if (!oldSet?.has(str)) added.push(item);
            });

            oldArr?.forEach((item) => {
                const str = JSON.stringify(item);
                if (!newSet?.has(str)) removed.push(item);
            });
        };

        return {
            added,
            removed,
            updated,
        };
    }
    catch (error) {
        console.log('error in the smartArrayDiff function :>> ', error);

        return {
            added: [],
            removed: [],
            updated: [],
        };
    };
};

export default smartArrayDiff;