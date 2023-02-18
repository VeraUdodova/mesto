export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector)
        this._infoElement = document.querySelector(infoSelector)
        this._avatarElement = document.querySelector(avatarSelector)
    }


    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            info: this._infoElement.textContent
        };
    }


    setUserInfo({form_profile_name, form_profile_status}) {
        if (form_profile_name) {
            this._nameElement.textContent = form_profile_name
        }
        if (form_profile_status) {
            this._infoElement.textContent = form_profile_status
        }
    }

    setNewAvatar(form_avatar_url) {
        if (form_avatar_url) {
            this._avatarElement.src = form_avatar_url
        }
    }
}