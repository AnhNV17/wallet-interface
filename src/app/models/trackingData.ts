export class TrackingData {
    message: String;
    dataReturn: any;
    info: String;
    transactedDate: String;
    productInfoFromSupplier: {
        sellerInfo: String;
        transactedDate: String;
        productInfo: {};
    };
    productInfoFromSeller: {
        sellerInfo: String;
        transactedDate: String;
        productInfo: {};
    };
}