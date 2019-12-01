import { Message } from "~/app/modele/message.model";

export interface Scan {
    type: string,
    maxSize: number,
    writable: boolean,
    message: Array<Message>,
    canMakeReadOnly: boolean,
    id: Array<any>,
    techList: Array<any>
}
