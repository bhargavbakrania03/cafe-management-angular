import { HttpHeaders } from "@angular/common/http";

export const CONSTANTS = {
    REGEX: {
        name_regex: '[a-zA-Z ]*',
        email_regex: '[a-zA-Z0-9_.-]+@[A-Za-z0-0-9_.-]+\.[a-z]{2,3}',
        contact_number_regex: '[0-9]{10,10}',
        password_regex: '[a-zA-Z0-9!@#$_]{3,20}',
    },
    AUTH_TOKEN: 'CURRENT_TOKEN',
    API_URL: {
        AUTH: {
            login: 'user/login',
            sign_up: 'user/register',
            forgot_password: 'user/forgotpassword',
            change_password: 'user/change-password',
        },
        RESET_PASSWORD: {
            reset_password: 'user/reset-password',
            check_token: 'user/check-token/',
        },
        DASHBOARD: {
            dashboard_details: 'dashboard/details/',
        },
        CATEGORY: {
            get_category: 'category/allcategory/',
            get_category_by_id: 'category/',
            add_category: 'category/add/',
            update_category: 'category/update/',
        },
        PRODUCT: {
            add_product: 'product/add',
            get_product: 'product/allproduct',
            update_product: 'product/update/',
            delete_product: 'product/delete/',
            update_status: 'product/changeStatus/',
            get_product_by_id: 'product/',
        },
        BILL: {
            generate_report: 'bill/generatereport',
            get_pdf: 'bill/getPdf/',
            get_bills: 'bill/allbills',
            delete_bill: 'bill/deletebill/',
        },
        USER: {
            get_user: 'user/alluser',
            update_user: 'user/verify/',
        }
    },
    ERROR: {
        auth_error: 'You are not authorized to access this page !',
        generic_error: 'Some Unknown error occured !',
        product_exists: 'Product already exists !',
    },
    MESSAGE: {
        product_added: 'Product Added Successfully',
    },
    ROUTES: {
        dashboard: '/cafe/dashboard',
        login: '/login',
    },
    HEADERS: {
        content_json: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
}