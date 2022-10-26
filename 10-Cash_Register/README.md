# Live ==> [Product Preview](https://silly-empanada-362546.netlify.app/).


# Cash Register
## Return:
> Cashback accounts according to the total amount entered according to the money situation in the safe.

## note:
> Since it has js assignments, it has been arranged in accordance with the original of the assignment. HTML & CSS are used to receive data input.

> It is arranged according to the terms of [**Cash Register**](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register) , one of the js certificate assignments of the Freecodecamp.org site.

> It accepts to pay the purchase price as the first input (price), and to pay the second input (cash)

> Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

> Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

> Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.


> ### till:
```
["PENNY", 1.01]
["NICKEL", 2.05]
["DIME", 3.1]
["QUARTER", 4.25]
["ONE", 90]
["FIVE", 55]
["TEN", 20]
["TWENTY", 60]
["ONE HUNDRED", 100]
```