
let varlidatorRules = {
    required(value) {
        return value ? undefined : "Vui lòng nhập trường này"
    },

    min(min) {
        return (value) => value.length >= min ? undefined : `Vui lòng nhập tối đa ${min} kí tự`
    },

    username(value) {
        return !UserModel.isExistUser(value.trim()) ? undefined : "Tài khoản đã tồn tại"
    },

    isConfirmed(value) {
        let password = formElement.querySelector('.password').value
        return value == password ? undefined : "Mật khẩu nhập lại không đúng"
    },

    isNumber(value) {
        return Number(value) ? undefined : "Số điện thoại có kí tự chữ"
    },

    checkPassCurrent(value) {
        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        return value == userCurrent.password ? undefined : "Mật khẩu hiện tại không đúng"
    }

}

function getParrent(element, seletor) {
    while(element.parentElement) {
        if(element.parentElement.matches(seletor)) {
            return element.parentElement
        }
        element = element.parentElement
    }
}


let formRules = {}
let formElement

const ValidatorForm = {
    Initialize(formSelector) {
        formElement = $(formSelector)
        if(formElement) {
            let inputList = formElement.querySelectorAll('[name][rules]')

            inputList.forEach(input => {
                let rules = input.getAttribute('rules').split('|');

                rules.forEach(rule => {
                    let ruleFunction = varlidatorRules[rule]
                    if(rule.includes(':')) {
                        let ruleInfo = rule.split(':')
                        ruleFunction = varlidatorRules[ruleInfo[0]](ruleInfo[1])
                        
                    }

                    if(Array.isArray(formRules[input.name])) {
                        formRules[input.name].push(ruleFunction)
                    } else {
                        formRules[input.name] = [ruleFunction]
                    }

                })

                input.onblur = this.handleValidate
                input.oninput = this.clearError
            })
        }
    },

    handleValidate(event) {
        let errorMessage
        let rules = formRules[event.target.name]
        for( let rule of rules) {
            errorMessage = rule(event.target.value)
            if(errorMessage) break;
        }
            
        if(errorMessage) {
            let groupElement = getParrent(event.target, '.groups')
            groupElement.classList.add('invalid')
            groupElement.querySelector('.message').innerText = errorMessage
        }

        return !errorMessage
    },

    clearError(event) {
        let groupElement = getParrent(event.target, '.groups')
        if(groupElement.classList.contains('invalid'))
        groupElement.classList.remove('invalid')
        let message = groupElement.querySelector('.message')
        if(message) message.innerText = ""
    }, 
}