export interface IPaymentModeList {
    id: string,
    name: string,
    about: string,
    isEnabled: boolean,
    publishKey: string,
    secretKey: string,
    webHookUrl: string
}