import {delay} from "./Counter/counterSagas";

export class MockService {
    async Increment(orig: number, addBy: number) {
        await delay(1000);
        return orig + addBy;
    }

    async getProfileInformation() {
        return {
            firstName: 'John',
            lastName: 'Doe'
        }
    }
}