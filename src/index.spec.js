import expect, { createSpy } from 'expect';
import restClientRouter from './index';

describe('Rest Client Router', () => {
    const fakeClient1 = createSpy();
    const fakeClient2 = createSpy();

    const router = restClientRouter({
        rules: [
            ['resource1',  'service1'],
            ['resource2/*/resource3', 'service2'],
            ['resource5', 'service5']
        ],
        services: {
            service1: fakeClient1,
            service2: fakeClient2
        }
    })

    it('should call fakeClient1 when resource1 is called', () => {
        router('GET_MANY', 'resource1', {});
        expect(fakeClient1).toHaveBeenCalled();
    })

    it('should call fakeClient1 when service1://resource1 is called', () => {
        router('GET_MANY', 'service1://resource1', {});
        expect(fakeClient1).toHaveBeenCalledWith('GET_MANY', 'resource1', {});
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

    it('should throw error when service is not defined', () => {
        expect(() => {
            router('GET_MANY', 'resource5', {});
        }).toThrow(/Service service5 is not defined/)
    })
});