export interface IAxiosResponse {
    data: Record<string, unknown>;
    status: number;
    statusText: string;
    headers: Record<string, unknown>;
    config: Record<string, unknown>;
    request: Record<string, unknown>;
}
