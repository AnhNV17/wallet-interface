export class TrackingData {
    type: String;
    message: String;
    dataReturn: any;
    info: String;
    productInfo: any;
    transactedDate: String;
    supplierInfo: String;
    consumerInfo: String;
    productInfoFromSupplier: {
        supplierInfo: String;
        transactedDate: String;
        productInfo: {};
    };
    productInfoFromSeller: {
        sellerInfo: String;
        transactedDate: String;
        productInfo: {};
    };
}