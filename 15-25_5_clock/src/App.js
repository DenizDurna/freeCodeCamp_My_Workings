import './App.css';
import React from 'react'

let countDown;
let time;
const timeColor = { color: "#09f61f", fontWeight: "bold" };
const defaultTimeColor = { color: "white" };
const sound = new Audio(
  "http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg"
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Break: 5,
      Session: 25,
      duration: 1500,
      minutes: 25,
      situation: "pause",
      title: "Session",
      style: defaultTimeColor
    };
  }

  breaatdown=()=> {
    if (this.state.Break > 1 && this.state.situation == "pause") {
      if (this.state.title == "Session") {
        this.setState((state) => ({
          Break: state.Break - 1
        }));
      } else {
        this.setState((state) => ({
          Break: state.Break - 1,
          duration: state.Break * 60 - 60
        }));
      }
    }
  }

  breaatup=()=> {
    if (this.state.Break < 60 && this.state.situation == "pause") {
      if (this.state.title == "Session") {
        this.setState((state) => ({
          Break: state.Break + 1
        }));
      } else {
        this.setState((state) => ({
          Break: state.Break + 1,
          duration: state.Break * 60 + 60
        }));
      }
    }
  }

  sessiondown=()=> {
    if (this.state.Session > 1 && this.state.situation == "pause") {
      if (this.state.title == "Break") {
        this.setState((state) => ({
          Session: state.Session - 1
        }));
      } else {
        this.setState((state) => ({
          Session: state.Session - 1,
          duration: state.Session * 60 - 60
        }));
      }
    }
  }

  sessionup=()=> {
    if (this.state.Session < 60 && this.state.situation == "pause") {
      if (this.state.title == "Break") {
        this.setState((state) => ({
          Session: state.Session + 1
        }));
      } else {
        this.setState((state) => ({
          Session: state.Session + 1,
          duration: state.Session * 60 + 60
        }));
      }
    }
  }

  play=()=> {
    if (this.state.situation != "play") {
      this.setState({
        situation: "play"
      });

      time = this.state.duration;
      countDown = setInterval(() => {
        if (this.state.situation == "play") {
          const newSeconds = Math.round(time - 1);
          time = newSeconds;
          let minit = parseInt(time / 60, 10);
          let second = parseInt(time % 60, 10);
          minit = minit.toString().padStart(2, "0");
          second = second.toString().padStart(2, "0");
          this.setState({
            duration: time,
            minutes: minit,
            seconds: second
          });
          if (time < 60) {
            this.setState({
              style: timeColor
            });
          } else {
            this.setState({
              style: defaultTimeColor
            });
          }
          if (time <= 0 && this.state.title == "Session") {
            time = this.state.Break * 60;
            this.setState({
              title: "Break"
            });
            sound.play();
          } else if (time <= 0 && this.state.title == "Break") {
            time = this.state.Session * 60;
            this.setState({
              title: "Session"
            });
            sound.play();
          }
        }
      }, 1000);
    }
  }

  pause=()=>{
    if (this.state.situation == "play") {
      clearInterval(countDown);
      this.setState((state) => ({
        situation: "pause",
        duration: time
      }));
    }
  }

  reset=()=> {
    clearInterval(countDown);
    this.setState({
      Break: 5,
      Session: 25,
      duration: 1500,
      minutes: 25,
      seconds: "00",
      situation: "pause",
      title: "Session",
      style: defaultTimeColor
    });
  }

  render() {
    return (
      <div id="pomodoro">
        <div>
          <h1>25 + 5 Clock</h1>
        </div>

        <div id="timer-label" style={this.state.style}>
          <h2>{this.state.title}</h2>
          <p id="time-left">
            {parseInt(this.state.duration / 60, 10)
              .toString()
              .padStart(2, "0") +
              ":" +
              parseInt(this.state.duration % 60, 10)
                .toString()
                .padStart(2, "0")}
          </p>
        </div>

        <div>
          <button id="start_stop" onClick={this.play}>
            <i class="fa-regular fa-circle-play"></i>
          </button>
          <button onClick={this.pause}>
            <i class="fa-regular fa-circle-pause"></i>
          </button>
          <button id="reset" onClick={this.reset}>
            <i class="fas fa-regular fa-rotate"></i>
          </button>
        </div>

        <div id="label">
          <div id="break-label" class="label ">
            <h3>Break Length</h3>
            <div class="labelflex">
              <button id="break-decrement" onClick={this.breaatdown}>
                <i class="fa-regular fa-circle-down"></i>
              </button>
              <p id="break-length">{this.state.Break}</p>
              <button id="break-increment" onClick={this.breaatup}>
                <i class="fa-regular fa-circle-up"></i>
              </button>
            </div>
          </div>

          <div id="session-label" class="label">
            <h3>Session Length</h3>
            <div class="labelflex">
              <button id="session-decrement" onClick={this.sessiondown}>
                <i class="fa-regular fa-circle-down"></i>
              </button>
              <p id="session-length">{this.state.Session}</p>
              <button id="session-increment" onClick={this.sessionup}>
                <i class="fa-regular fa-circle-up"></i>
              </button>
            </div>
          </div>
        </div>

        <div id="desinger">
          <p>Designed and Coded by</p>
          <a href="https://codepen.io/Deniz-durna">Deniz Durna</a>
        </div>
      </div>
    );
  }
}



export default App;
