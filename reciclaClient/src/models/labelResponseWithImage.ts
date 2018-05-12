export class LabelResponseWithImage {
    labelAnnotations: any;
    base64Image: string;

    constructor(labelAnnotations: any, base64Image: string) {
        this.labelAnnotations = labelAnnotations
        this.base64Image = base64Image
    }
}