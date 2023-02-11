export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameElement = document.querySelector(nameSelector)
        this._infoElement = document.querySelector(infoSelector)
    }


    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            info: this._infoElement.textContent
        };
    }


    setUserInfo({form_profile_name, form_profile_status}) {
        this._nameElement.textContent = form_profile_name;
        this._infoElement.textContent = form_profile_status;
    }
}