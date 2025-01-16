class Lead {
    public firstname: string;
    public lastname: string;
    public phone: number;
    public email: string | undefined;
    public age: number | undefined;
    public investment: string;
    public company: string | undefined;
    public role: string | undefined;
    public incomeTax: boolean;
    public tyc: boolean;

    constructor(data: any) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
        this.email = data.email;
        this.age = data.age;
        this.investment = data.investment;
        this.company = data.company;
        this.role = data.role;
        this.incomeTax = data.incomeTax;
        this.tyc = data.tyc;
    }
}

export default Lead;