export interface SignUp {
    name: string;
    email: string;
    contactNumber: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}

export interface ChangePassword {
    old_password: string;
    new_password: string;
}

export interface ResetPassword {
    new_password: string;
}

export interface TokenPayload {
    role: string;
}