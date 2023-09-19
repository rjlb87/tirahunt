export function validate(values) {
    const errors = {};
  
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passPattern = /^[A-Za-z]\w{7,14}$/;
  
    if (!values.username) {
      errors.username = "Name is Require";
    }
  
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Email format is invalid";
    }
  
    if (!values.password) {
      errors.password = "Password is Required";
    } else if (!passPattern.test(values.password)) {
      errors.password =
        "Dapat minimum of 6 letters and 1 uppercase and 1 special character";
    }

    return errors;
  }
  