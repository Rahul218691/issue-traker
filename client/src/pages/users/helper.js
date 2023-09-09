export const userCreateValidate = ({
    username,
    email,
    password,
    role
}) => {
    const errors = {}

    if (!username) {
        errors['username'] = 'Username is Required'
    }

    if (!email) {
        errors['email'] = 'Email is Required'
    }

    if (email && !validateEmail(email)) {
        errors['email'] = 'Please enter valid email'
    }

    if (!password) {
        errors['password'] = 'Password is Required'
    }

    if (password && password.length < 6) {
        errors['password'] = 'Password should be minimum 6 characters'
    }

    if (!role) {
        errors['role'] = 'Role is Required'
    }

    if (role && role === 'Choose Role') {
        errors['role'] = 'Role is Required'
    }

    return errors

}

const validateEmail = (email) => {
    return email.match(
        // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    ) 
}