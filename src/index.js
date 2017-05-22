import { wildcardPattern } from 'wildcard-regex';

export default ({ rules, services = {} }) => {
    function extractResourceDetails(resource) {
        const results = resource.match(/^(\w+):\/\/(.*)$/)
        if (results) {
            return { service: results[1], resource: results[2] };
        } else {
            return null;
        }
    }

    function mapResourceDetails(resource) {
        for (const rule of rules) {
            const [key, service] = rule;
            const matcher = new RegExp(wildcardPattern(key), 'i');
            if (matcher.test(resource)) {
                return { service, resource };
            }
        }
        return null;
    }


    function route(resource) {
        const details = extractResourceDetails(resource) ||
            mapResourceDetails(resource);
        if (!details)
            throw new Error(`Rest Router: Resource ${resource} cannot be found in routing table`)
        if (!services[details.service])
            throw new Error(`Rest Router: Service ${details.service} is not defined, please define it in the second argument`)
        return {
            service: details.service,
            resource: details.resource,
            client: services[details.service]
        }
    }

    return (type, resource, params) => {
        const result = route(resource)
        return result.client(type, result.resource, params);
    }
};