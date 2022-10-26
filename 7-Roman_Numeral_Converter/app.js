//print the result to the screen
function rslt(event) {
    event.preventDefault();
    let rmnNumber = event.target.roman.value
    document.getElementById("demo").innerHTML = convertToRoman(rmnNumber)
}

//convert number to roman numeral
function convertToRoman(num) {
    let a = num.toString().split("")
    let c = []; let b = {
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M",
    }

    //thousands place
    if (a.length == 4) {
        if (a[0] <= 3) {
            for (let aa = 0; aa < a[0]; aa++) {
                c.push(b[1000])
            }
            a.splice(0, 1)
        }
    }

    //hundreds digit
    if (a.length == 3) {
        if (a[0] <= 3) {
            for (let aa = 0; aa < a[0]; aa++) {
                c.push(b[100])
            }
        } else if (a[0] == 4) {
            c.push(b[100] + b[500])
        } else if (a[0] > 4 && a[0] < 9) {
            c.push(b[500])
            for (let aa = 5; aa < a[0]; aa++) {
                c.push(b[100])
            }
        } else if (a[0] == 9) {
            c.push(b[100] + b[1000])
        }
        a.splice(0, 1)
    }

    // they digit   
    if (a.length == 2) {
        if (a[0] <= 3) {
            for (let aa = 0; aa < a[0]; aa++) {
                c.push(b[10])
            }
        } else if (a[0] == 4) {
            c.push(b[10] + b[50])
        } else if (a[0] > 4 && a[0] < 9) {
            c.push(b[50])
            for (let aa = 5; aa < a[0]; aa++) {
                c.push(b[10])
            }
        } else if (a[0] == 9) {
            c.push(b[10] + b[100])
        }
        a.splice(0, 1)
    }

    // ones digit 
    if (a.length == 1) {
        if (a[0] <= 3) {
            for (let aa = 0; aa < a[0]; aa++) {
                c.push(b[1])
            }
        } else if (a[0] == 4) {
            c.push(b[1] + b[5])
        } else if (a[0] > 4 && a[0] < 9) {
            c.push(b[5])
            for (let aa = 5; aa < a[0]; aa++) {
                c.push(b[1])
            }
        } else if (a[0] == 9) {
            c.push(b[1] + b[10])
        }
    } return c.join("");
} 