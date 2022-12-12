export interface ProductStatBySex {
    c_sex:      number;
    cost:       number;
    count:      number;
    p_category: string;
    p_id:       string;
    p_name:     string;
    price:      number;
    profit:     number;
}

export interface Product {
    cost:      number;
    pcategory: string;
    pid:       string;
    pname:     string;
    price:     number;
}

export interface ProductOrder {
    cid:       string;
    cname:     string;
    cost:      number;
    csex:      string;
    num:       number;
    oid:       number;
    otime:     string;
    pcategory: string;
    pid:       string;
    pname:     string;
    price:     number;
}
