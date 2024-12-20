class Lead {
    public firstname: string;
    public lastname: string;
    public phone: number;
    public email: string | undefined;
    public income: number | undefined;
    public downpayment: number | undefined;
    public property_val: number | undefined;
    public document_type: string | undefined;
    public document_number: number | undefined;
    public property_type: string | undefined;
    public search_status: string | undefined;
    public notes: string | undefined;
    public tyc: boolean;

    constructor(data: any) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
        this.email = data.email;
        this.document_type = data.document_type;
        this.document_number = data.document_number;
        this.income = data.income;
        this.downpayment = data.downpayment;
        this.property_val = data.property_val;
        this.property_type = data.property_type;
        this.search_status = data.search_status;
        this.notes = data.notes;
        this.tyc = data.tyc;
    }
}

export default Lead;