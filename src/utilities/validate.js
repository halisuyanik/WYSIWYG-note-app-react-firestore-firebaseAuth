
export async function validateInput(input) {
    var validCharacters = /^[^<>"'`]+$/;

    if (validCharacters.test(input)) {
      return true;
    } else {
      return false;
    }
}