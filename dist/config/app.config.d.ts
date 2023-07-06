export interface IAppConfig {
    APP_PREFIX: string;
    APP_PORT: string;
}
export declare const appConfig: (() => {
    APP_PREFIX: string;
    APP_PORT: string | number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    APP_PREFIX: string;
    APP_PORT: string | number;
}>;
