export type ToastType = 'WARNING' | 'ERROR' | 'INFORMATION';

export interface ToastPayload {
    text: string,
    type: ToastType
}