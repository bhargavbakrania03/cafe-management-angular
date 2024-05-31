export const CONSTANTS = {
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
            add_category: 'category/add/',
            update_category: 'category/update/',
        },
        PRODUCT: {
            add_product: 'product/add',
            get_product: 'product/allproduct',
            update_product: 'product/update/',
            delete_product: 'product/delete/',
            update_status: 'product/verify/',
        }
    },
    ERROR: {
        auth_error: 'You are not authorized to access this page !',
        generic_error: 'Some Unknown error occured !',
    },
    ROUTES: {
        dashboard: '/cafe/dashboard',
        login: '/login',
    }
}