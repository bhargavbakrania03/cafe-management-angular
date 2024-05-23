export interface SignUp {
    userName: string;
    userEmail: string;
    contactNo: string;
    password: string;
}

export interface Login {
    userEmail: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ResetPassword {
    newPassword: string;
}