function rslt(event) {
  event.preventDefault();
  let rmnNumber = event.target.number.value
  document.getElementById("demo").innerHTML = telephoneCheck(rmnNumber)
}



function telephoneCheck(str) {
  let kon1 = /^1 \d{3}-\d{3}-\d{4}$/g
  let kon2 = /^1 \(\d{3}\) \d{3}-\d{4}$/g
  let kon3 = /^\d\d{8}\d$/g
  let kon4 = /^\d{3}-\d{3}-\d{4}$/g
  let kon5 = /^\(\d{3}\)\d{3}-\d{4}$/g
  let kon6 = /^1\(\d{3}\)\d{3}-\d{4}$/g
  let kon7 = /^1 \d{3} \d{3} \d{4}$/g
  let kon8 = /^1\(\d{3}\)\d{3}-\d{4}$/g

  if (kon1.test(str)) {
    return true
  }
  else if (kon2.test(str)) {
    return true
  }

  else if (kon3.test(str)) {
    return true
  }

  else if (kon4.test(str)) {
    return true
  }

  else if (kon5.test(str)) {
    return true
  }

  else if (kon6.test(str)) {
    return true
  }
  else if (kon7.test(str)) {
    return true
  }
  else if (kon8.test(str)) {
    return true
  }

  return false;
}


