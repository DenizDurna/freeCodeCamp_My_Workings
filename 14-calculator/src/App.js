import './App.css';
import React from 'react';

const BUTTON = [
  { value: "AC", id: "ac" },
  { value: "⬅", id: "back" },
  { value: "/", id: "division" },
  { value: "X", id: "multiplication" },
  { value: 7, id: "seven" },
  { value: 8, id: "eight" },
  { value: 9, id: "nine" },
  { value: "-", id: "subtraction" },
  { value: 4, id: "four" },
  { value: 5, id: "five" },
  { value: 6, id: "six" },
  { value: "+", id: "addition" },
  { value: 1, id: "one" },
  { value: 2, id: "two" },
  { value: 3, id: "three" },
  { value: "=", id: "equal" },
  { value: 0, id: "zero" },
  { value: ".", id: "brace" }
];

const number = /[\d]/;
const multiplication = /x/gi;
const inference = /--/gi;

const Keys = (props) => {
  return (
    <div className="buttonGroup">
      {BUTTON.map((key) => {
        return (
          <div
            className="button"
            id={key.id}
            value={key.value}
            onClick={() => props.work(key.value)}
          >
            {key.value}
          </div>
        );
      })}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "0",
      total: ""
    };
  }

  none = (i) => {
    this.setState({
      value: i.toString(),
      total: i.toString()
    });
  };

  t2NotNumber = (i) => {
    this.setState((state) => ({
      value: i.toString(),
      total: [state.total.slice(0, -1), i].join("")
    }));
  };
  vNotNumber = (i) => {
    this.setState((state) => ({
      value: i.toString(),
      total: [state.total, i].join("")
    }));
  };

  addEnd = (i) => {
    this.setState((state) => ({
      total: [state.total, i].join(""),
      value: [state.value, i].join("")
    }));
  };

  ac = () => {
    this.setState({
      value: "0",
      total: ""
    });
  };

  allEndDell = () => {
    this.setState((state) => ({
      value: state.value.slice(0, -1),
      total: state.total.slice(0, -1)
    }));
  };

  totalEndDell = () => {
    this.setState((state) => ({
      value: "0",
      total: state.total.slice(0, -1)
    }));
  };

  tZero = () => {
    this.setState({
      value: "0.",
      total: "0."
    });
  };

  vZero = (i) => {
    this.setState((state) => ({
      value: "0.",
      total: [state.total, i].join("")
    }));
  };

  zNotV = () => {
    this.setState((state) => ({
      value: "0.",
      total: [state.total, "0."].join("")
    }));
  };

  tEndNumber = (final) => {
    const evl = eval(final);
    if (Number.isInteger(evl) == false) {
      this.setState({
        value: evl.toFixed(2),
        total: final + "=" + evl.toFixed(2)
      });
    } else {
      this.setState({
        value: evl,
        total: final + "=" + evl
      });
    }
  };

  tEndNotNumber = (final) => {
    const evl = eval(final.slice(0, -1));
    if (Number.isInteger(evl) == false) {
      this.setState({
        value: evl.toFixed(2),
        total: final.slice(0, -1) + "=" + evl.toFixed(2)
      });
    } else {
      this.setState({
        value: evl,
        total: final.slice(0, -1) + "=" + evl
      });
    }
  };

  negative = (i) => {
    this.setState((state) => ({
      value: i,
      total: [state.total.slice(0, -2), i].join("")
    }));
  };

  work = (i) => {
    const { value, total } = this.state;
    const totalLength = total[total.length - 1];
    const totalLength2 = total[total.length - 2];
    if (
      (value != "Limite Ulaştınız" &&
        value.length < 17 &&
        total.includes("=") == false) ||
      (total.includes("=") && i == "AC") ||
      (total.includes("=") == false &&
        typeof i != "number" &&
        typeof i != "." &&
        typeof i != "=")
    ) {
      //if number
      if (typeof i == "number") {
        if (total == "0" || total.length == 0) {
          this.none(i);
        } else if (totalLength == "0" && number.test(totalLength2) == false) {
          this.t2NotNumber(i);
        } else if (!number.test(value) && value != "-") {
          this.vNotNumber(i);
        } else if (value == "0" && typeof totalLength2 != "number") {
          this.vNotNumber(i);
        } else {
          this.addEnd(i);
        }
      }

      //if ac
      else if (i == "AC") {
        this.ac();
      }
      //undo
      else if (i == "⬅") {
        if (number.test(value) && value != "0") {
          if (value.length > 1) {
            this.allEndDell();
          } else {
            this.totalEndDell();
          }
        } else if (value == "0" && totalLength == 0) {
          this.totalEndDell();
        }
      }

      //fraction
      else if (i == ".") {
        if (number.test(value) && value.includes(".") == false) {
          if (total == "0" || total.length == 0) {
            this.tZero();
          } else if (value[value.length - 1] !== totalLength) {
            this.zNotV();
          } else if (
            value == "0" &&
            total.length > 0 &&
            value !== totalLength
          ) {
            this.vZero();
          } else {
            this.addEnd(i);
          }
        }
      }

      //equal
      else if (i == "=") {
        if (total != "") {
          const final = total
            .replace(multiplication, "*")
            .replace(inference, "- -");
          if (number.test(value)) {
            this.tEndNumber(final);
          } else {
            this.tEndNotNumber(final);
          }
        }
      }

      //negative
      else if (i == "-") {
        if (total == 0 || total.length == 0) {
          this.none(i);
        } else if (
          (number.test(value) && value != "0") ||
          (number.test(totalLength) == false &&
            number.test(totalLength2) &&
            total.length > 1)
        ) {
          this.vNotNumber(i);
        } else if (
          number.test(totalLength) == false &&
          number.test(totalLength2) == false &&
          total.length > 1
        ) {
          this.negative(i);
        }
      }

      //transactions
      else if (total != 0 || total.length != 0) {
        if (total != "-") {
          if (totalLength2 == "-" && number.test(totalLength == false)) {
            this.setState({
              value: i,
              total: [total.slice(0, -2), i].join("")
            });
          } else if (number.test(value)) {
            this.setState({
              value: i,
              total: [total, i].join("")
            });
          } else {
            this.setState({
              value: i,
              total: [total.slice(0, -1), i].join("")
            });
          }
        }
      }
    } //other
    else if (value != "Limite Ulaştınız" && value.length >= 17) {
      this.setState({
        value: "Limite Ulaştınız",
        newValue: this.state.value
      });
      setTimeout(() => this.setState({ value: this.state.newValue }), 1000);
    } else if (total.includes("=")) {
      if (typeof i == "number") {
        this.none(i);
      } else if (i == "-" || i == "/" || i == "X" || i == "+") {
        this.setState({
          value: i,
          total: [value, i].join("")
        });
      }
    }
  };
  render() {
    return (
      <div id="d" class="row">
        <div id="equalss" class="col-1">
          <div id="border">
            <div id="display" class="row align-items-end">
              <p class="total">{this.state.total}</p>
              <p>{this.state.value}</p>
            </div>
            <Keys work={this.work} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;
