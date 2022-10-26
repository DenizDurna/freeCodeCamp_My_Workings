let till = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
//DOM manipulation
function rslt(event) {
  event.preventDefault();
  let price = event.target.price.value
  let cash = event.target.cash.value
  let tillcl = checkCashRegister(price, cash)
  let html = "";
  let chng = []
  for (let i in tillcl) {
    if (typeof tillcl[i] == "object") {
      for (let j in tillcl[i]) {
        chng.push(tillcl[i][j].join("="))
      }
      html += `${i}: ${chng} <br>`
    }
    else {
      html += `${i}: ${tillcl[i]} <br>`
    }
  }
  document.getElementById("demo").innerHTML = JSON.stringify(html)
}


function checkCashRegister(price, cash, cid = till) {
  let chngAmnt = cash - price;//change amount
  let change = {}, csobj = {};
  cid.map((obj) => csobj[obj[0]] = obj[1]) // The following formula is the case coins turned into objects.
  let ttl = cid.map(map => map[1]).reduce((tot, say) => tot + say)//case total
  let par = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ]

  // amounts less than money
  let fil = par.filter(arr => arr[1] <= chngAmnt).reverse();
  for (let a = 0; a < fil.length; a++) {
    while (chngAmnt > 0 && chngAmnt - fil[a][1] >= 0 && csobj[fil[a][0]] >= fil[a][1]) {
      if (change.hasOwnProperty(fil[a][0])) {
        change[fil[a][0]] = change[fil[a][0]] + fil[a][1]
        chngAmnt = (chngAmnt - fil[a][1]).toFixed(2)
        csobj[fil[a][0]] -= fil[a][1]
      } else {
        change[fil[a][0]] = fil[a][1]
        chngAmnt = (chngAmnt - fil[a][1]).toFixed(2)
        csobj[fil[a][0]] -= fil[a][1]
      }
    }
  }

  //if it is equal to the money in the safe
  if (cash - price == ttl) {
    return { status: "CLOSED", change: cid }
  }

  //If it's bigger than the money in the safe
  else if (cash - price > ttl || chngAmnt != 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }

  } else {
    return { status: "OPEN", change: Object.entries(change) }
  }
}


