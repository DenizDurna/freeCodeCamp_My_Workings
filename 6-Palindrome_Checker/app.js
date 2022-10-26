function rslt(event) {
  event.preventDefault();
  let str = event.target.palindrome.value
  document.getElementById("demo").innerHTML = palindrome(str)
}


function palindrome(str) {
  let reg = /\s|_|,|\.|-|\(|\)/g
  let ne = str.replace(reg, "").toLowerCase()
  if (ne.length % 2 !== 0) {
    let a = Math.ceil(ne.length / 2)
    return ne.slice(0, a) == ne.slice(a - 1).split("").reverse().join("")
  } else {
    let a = ne.length / 2
    return ne.slice(0, a) == ne.slice(a).split("").reverse().join("")

  }
}

