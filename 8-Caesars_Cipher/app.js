//print the result to the screen
function rslt(event) {
  event.preventDefault();
  let rmnNumber = event.target.cipher.value
  document.getElementById("demo").innerHTML = rot13(rmnNumber)
}
 

//  Uppercase Caesars Cipher
function rot13(str) {
  let cphsplt = str.split("")
  for (let value in cphsplt) {
    if (cphsplt[value] !== " " && cphsplt[value].charCodeAt(0) > 64 && cphsplt[value].charCodeAt(0) < 78) {
      cphsplt[value] = String.fromCharCode(cphsplt[value].charCodeAt(0) + 13)
    } else if (cphsplt[value] !== " " && cphsplt[value].charCodeAt(0) > 77 && cphsplt[value].charCodeAt(0) < 91) {
      cphsplt[value] = String.fromCharCode(cphsplt[value].charCodeAt(0) + 12 - 90 + 65)

    }
  }
  return cphsplt.join("");
}

