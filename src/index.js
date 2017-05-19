export default (mappings) => {
    function getClient(resource) {
        for (const key in mappings) {
            const client = mappings[key];
            const matcher  = new RegExp(key, 'i');
            if (matcher.test(resource)) {
                return client;
            }
        }
        throw new Error(`Resource ${resource} cannot be found in routing table`)
    }
    return (type, resource, params) => {
        return getClient(resource)(type, resource, params);
    }
};