import { ViewController } from '../view-controller';
export declare class OverlayController extends ViewController {
    constructor(navCtrl: any, componentType: any, opts?: {});
    setTitle(title: any): void;
    setSubTitle(subTitle: any): void;
    setBody(body: any): void;
    addInput(input: any): void;
    addButton(button: any): void;
    close(): void;
    onClose(handler: any): void;
}
