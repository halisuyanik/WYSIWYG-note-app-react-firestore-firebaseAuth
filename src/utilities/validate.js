import toast  from "react-hot-toast";

export async function validateInput(input) {
    var validCharacters = /^[^<>"'`]+$/;

    if (validCharacters.test(input)) {
      return true;
    } else {
      return false;
    }
}

function emailVerify(errors={}, values){
  if(!values.email){
      errors.email=toast.error('email required !');
  }
  else if(values.email.includes(" ")){
      errors.email=toast.error('wrong email !')
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = toast.error("invalid email address !")
  }
  return errors;
}

export async function emailValidate(values){
  const errors=emailVerify({},values)
  return errors;
}

