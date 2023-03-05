import { action, makeObservable, observable } from "mobx";
import { IUserInfo } from '../interface/ILogin'
import AppStorage from '../storage/AppStorage';
import Messages from "../constant/Messages";
import Function from "../utils/Function";

export default class AuthStore {
    @observable userId: number = 0;
    @observable name: string = '';
    @observable email: string = '';
    @observable roleId: number = 3;
    @observable isPrivacyPolicyEnabled: boolean = false;
    @observable password: string = '';
    @observable confirmPassword: string = '';
    @observable otp: string = '';
    @observable isRememberMe: boolean = false;
    @observable isLoggedIn: boolean = false;
    @observable isValidToken: boolean = false;
    @observable accessToken: string = '';
    @observable refreshToken: string = '';
    @observable portal: string = '';
    @observable isLoading: boolean = false;
    @observable formLoginErrors: any = {};
    @observable formRegistrationErrors: any = {};
    @observable formOTPVerificationErrors: any = {};
    @observable formAccountActivationErrors: any = {};
    @observable formForgotPasswordErrors: any = {};
    @observable formResetPasswordErrors: any = {};

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action resetLoginPostData() {
        this.formLoginErrors = {};
        this.formRegistrationErrors = {};
        this.formOTPVerificationErrors = {};
        this.formAccountActivationErrors = {};
        this.formForgotPasswordErrors = {};
        this.formResetPasswordErrors = {};
    }

    @action resetData() {
        this.userId = 0;
        this.name = '';
        this.email = '';
        this.isPrivacyPolicyEnabled = false;
        this.isRememberMe = false;
        this.isLoggedIn = false;
        this.isValidToken = false;
        this.isLoading = false;
        this.password = '';
        this.confirmPassword = '';
        this.otp = '';
        this.accessToken = '';
        this.refreshToken = '';
    }

    @action async init() {
        await this.setUserDetails();
    }

    @action async setUserDetails() {
        const userInfo: IUserInfo | any = await AppStorage.getUserDetails();
        if (userInfo?.accessToken) {
            this.userId = userInfo?.id;
            this.name = userInfo?.name;
            this.email = userInfo?.email;
            this.password = userInfo?.password;
            this.accessToken = userInfo?.accessToken;
            this.refreshToken = userInfo?.refreshToken;
            this.isLoggedIn = true;
            this.roleId = userInfo?.roleId;
        }
    }

    @action isValidLoginForm() {
        this.formLoginErrors = {};

        if (!this.email) {
            this.formLoginErrors.email = Messages.EmptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formLoginErrors.email = Messages.InvalidEmail;
        }

        if (!this.password) {
            this.formLoginErrors.password = Messages.EmptyPassword;
        } else if (this.password.length < 5) {
            this.formLoginErrors.password = Messages.InvalidPassword;
        }

        if (Object.keys(this.formLoginErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidRegistrationForm() {
        this.formRegistrationErrors = {};

        if (!this.email) {
            this.formRegistrationErrors.email = Messages.EmptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formRegistrationErrors.email = Messages.InvalidEmail;
        }

        if (!this.isPrivacyPolicyEnabled) {
            this.formRegistrationErrors.privacyPolicy = Messages.EmptyPrivacyPolicy;
        }

        if (Object.keys(this.formRegistrationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidOTPVerificationForm() {
        this.formOTPVerificationErrors = {};

        if (!this.otp) {
            this.formOTPVerificationErrors.otp = Messages.EmptyOTP;
        } else if (this.otp.length < 5) {
            this.formOTPVerificationErrors.otp = Messages.InvalidOTP;
        }

        if (Object.keys(this.formOTPVerificationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidAccountActivationForm() {
        this.formAccountActivationErrors = {};

        if (!this.password) {
            this.formAccountActivationErrors.password = Messages.EmptyPassword;
        } else if (this.password.length < 5) {
            this.formAccountActivationErrors.password = Messages.InvalidPassword;
        }

        if (Object.keys(this.formAccountActivationErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidForgotPasswordForm() {
        this.formForgotPasswordErrors = {};

        if (!this.email) {
            this.formForgotPasswordErrors.email = Messages.EmptyEmail;
        } else if (!Function.isValidEmail(this.email)) {
            this.formForgotPasswordErrors.email = Messages.InvalidEmail;
        }

        if (Object.keys(this.formForgotPasswordErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action isValidResetPasswordForm() {
        this.formResetPasswordErrors = {};

        if (!this.password && !this.confirmPassword) {
            this.formResetPasswordErrors.password = Messages.EmptyPassword;
            this.formResetPasswordErrors.confirmPassword = Messages.EmptyConfirmPassword;
        }
        else if (!this.password) {
            this.formResetPasswordErrors.password = Messages.EmptyPassword;
        } else if (this.password.length < 5) {
            this.formResetPasswordErrors.password = Messages.InvalidPassword;
        } else if (!this.confirmPassword) {
            this.formResetPasswordErrors.confirmPassword = Messages.EmptyConfirmPassword;
        } else if (this.confirmPassword.length < 5) {
            this.formResetPasswordErrors.confirmPassword = Messages.InvalidPassword;
        } else if (this.password !== this.confirmPassword) {
            this.formResetPasswordErrors.confirmPassword = Messages.ConfirmPasswordMismatch;
        }

        if (Object.keys(this.formResetPasswordErrors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    @action setProfileInfo(userData: any, isLoginWithGoogle: boolean = false) {
        const userInfo: IUserInfo = {
            'userId': userData?.id,
            'email': userData?.email,
            'password': this.password,
            'name': userData?.name,
            'roleId': userData?.roleId,
            'accessToken': userData?.accessToken,
            'refreshToken': userData?.refreshToken
        }
        this.userId = userData?.id;
        this.email = userData?.email;
        this.roleId = userData?.roleId;
        this.accessToken = userData?.accessToken;
        this.refreshToken = userData?.refreshToken;
        if (this.isRememberMe || isLoginWithGoogle) {
            AppStorage.setUserDetails(userInfo);
            this.setUserDetails();
        }
    }

    @action async updateToken(tokenData: any) {
        let userInfo: IUserInfo | any = await AppStorage.getUserDetails();
        if (userInfo) {
            userInfo.accessToken = tokenData?.accessToken;
            userInfo.refreshToken = tokenData?.refreshToken;
            AppStorage.setUserDetails(userInfo);
            this.setUserDetails();
        }
    }
}
