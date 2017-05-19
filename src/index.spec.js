import expect, { createSpy } from 'expect';
import restClientRouter from './index';

describe('Rest Client Router', () => {
    const fakeClient1 = createSpy();
    const fakeClient2 = createSpy();

    const router = restClientRouter({
        'resource1': fakeClient1,
        'resource2/\\d+/resource3': fakeClient2
    })

    it('should call fakeClient1 when resource1 is called', () => {
        router('GET_MANY', 'resource1', {});
        expect(fakeClient1).toHaveBeenCalled();
    })

    it('should call fakeClient2 when resource3 is called', () => {
        router('GET_MANY', 'resource2/12/resource3', {});
        expect(fakeClient2).toHaveBeenCalled();
    })

    it('should throw error when resource is not configured', () => {
        expect(() => {
            router('GET_MANY', 'resource4', {});
        }).toThrow(/cannot be found in routing table/)
    })
});