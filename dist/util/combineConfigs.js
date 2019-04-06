// Borrowed from http://2ality.com/2015/01/es6-set-operations.html .
const union = (s1, s2) => new Set([...s1, ...s2]);
const difference = (s1, s2) => new Set([...s1].filter(x => !s2.has(x)));
export const getCombinedInclusionList = (criteriaList) => {
    let inclusionSet = new Set();
    let exclusionSet = new Set();
    for (const criteria of criteriaList) {
        const configInclusionSet = new Set();
        const configExclusionSet = new Set();
        criteria.include.forEach(s => configInclusionSet.add(s));
        if (criteria.exclude) {
            criteria.exclude.forEach(s => configExclusionSet.add(s));
        }
        inclusionSet = union(inclusionSet, configInclusionSet);
        exclusionSet = union(exclusionSet, configExclusionSet);
    }
    inclusionSet = difference(inclusionSet, exclusionSet);
    // Sorting here so that the order is consistent across calls.
    return [...inclusionSet].sort();
};
