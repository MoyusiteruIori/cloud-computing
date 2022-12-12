export default class GlobalConfig {
    // private static backendURL: string = 'http://127.0.0.1:4523/m1/1978278-0-default';
    private static backendURL: string = 'http://localhost:8080';

    public static getBackendURL = () => {
        return this.backendURL;
    }
}