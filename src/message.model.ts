export interface Message {
    tnf: number,
    type: number,
    id: Array<any>,
    payload: Array<number>,
    payloadAsHexString: string,
    payloadAsStringWithPrefix: string,
    payloadAsString: string
}
