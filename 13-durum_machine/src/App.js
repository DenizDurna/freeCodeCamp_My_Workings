import './App.css';
import React from 'react';

const DRUM = [
  {
    id: "QQ",
    Name: "Q",
    displayName: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    id: "WW",
    Name: "W",
    displayName: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    id: "EE",
    Name: "E",
    displayName: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    id: "AA",
    Name: "A",
    displayName: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    id: "SS",
    Name: "S",
    displayName: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    id: "DD",
    Name: "D",
    displayName: "Open HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    id: "ZZ",
    Name: "Z",
    displayName: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    id: "XX",
    Name: "X",
    displayName: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    id: "CC",
    Name: "C",
    displayName: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const PIANO = [
  {
    id: "QQ",
    Name: "Q",
    displayName: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    id: "WW",
    Name: "W",
    displayName: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    id: "EE",
    Name: "E",
    displayName: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    id: "AA",
    Name: "A",
    displayName: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    id: "SS",
    Name: "S",
    displayName: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    id: "DD",
    Name: "D",
    displayName: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    id: "ZZ",
    Name: "Z",
    displayName: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    id: "XX",
    Name: "X",
    displayName: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    id: "CC",
    Name: "C",
    displayName: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStyle: "keydiv"
    };
  }
  buttonChange = () => {
    this.setState({
      btnStyle: "keydiv"
    });
  };

  play = () => {
    if (this.props.power) {
      const sound = document.getElementById(this.props.name);
      sound.currentTime = 0;
      sound.play();
      sound.volume = this.props.volume;
      this.props.keyup(this.props.displayName);
      clearTimeout(this.btnTimer);
      this.setState({
        btnStyle: "keydiv presKey"
      });
      this.btnTimer = setTimeout(() => this.buttonChange(), 100);
    }
  };

  handleKeyPress = (event) => {
    if (event.key.toUpperCase() === this.props.name) {
      this.play();
    } else if (event.keyCode === 32 || event.keyCode === 13) {
      event.preventDefault();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div className={this.state.btnStyle}>
        <button
          id={this.props.id}
          onClick={this.play}
          onChange={this.props.keyup}
        >
          <audio id={this.props.name} src={this.props.url} />
          {this.props.name}
        </button>
      </div>
    );
  }
}

const KeyGroup = (props) => {
  return (
    <div id="buttonGroup">
      {props.instrument.map((key) => {
        return (
          <Key
            id={key.id}
            name={key.Name}
            displayName={key.displayName}
            url={key.url}
            keyup={props.keyup}
            volume={props.volume}
            power={props.power}
          />
        );
      })}
    </div>
  );
};

const Control = (props) => {
  return (
    <div id="controlgroup">
      <div>Power</div>
      <label class="switch control-space">
        <input
          type="checkbox"
          defaultChecked={props.power}
          onClick={props.clickPower}
        />
        <span class="slider"></span>
      </label>
      <div id="keyName" class="control-space">
        {" "}
        {props.keyname}
      </div>
      <input
        class="control-space-top control-space"
        type="range"
        id="myRange"
        min="0"
        max="1"
        value={props.volume}
        onChange={props.handleVolume}
        step="0.01"
      ></input>
      <div>Bank</div>
      <label class="switch">
        <input checked={props.bank} type="checkbox" onClick={props.clickBank} />
        <span class="slider"></span>
      </label>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      bank: false,
      instrument: DRUM,
      keyname: "DRUM MACHINE",
      volume: 0.50
    };
  }

  clickPower = () => {
    if (this.state.power) {
      this.setState((state, props) => ({
        power: false,
        keyname: "Off"
      }));
    } else {
      this.setState({
        power: true,
        keyname: "On"
      });
    }
  };

  clickBank = () => {
    if (this.state.power) {
      if (!this.state.bank) {
        this.setState({
          bank: true,
          keyname: "piano",
          instrument: PIANO
        });
      } else {
        this.setState({
          bank: false,
          keyname: "drum",
          instrument: DRUM
        });
      }
    }
  };

  keyup = (i) => {
    clearTimeout(this.displayTimer);
    this.setState({
      keyname: i
    });
    this.displayTimer = setTimeout(() => this.clear(), 1000);
  };

  handleVolume = (event) => {
    if (this.state.power) {
      this.setState({
        volume: event.target.value
      });
      this.keyup("Volume: " + Math.round(event.target.value * 100));
    } else {
      this.setState({
        keyname: "Off"
      });
    }
  };

  clear = () => {
    if (this.state.keyname !== "Off")
      this.setState({
        keyname: "DRUM MACHINE"
      });
  };

  render() {
    return (
      <div id="al">
        <h1>Drum Machine</h1>
        <div id="drum-machine">
          <div id="display">
            <KeyGroup
              power={this.state.power}
              bank={this.state.bank}
              instrument={this.state.instrument}
              keyname={this.state.keyname}
              keyup={this.keyup}
              volume={this.state.volume}
            />
          </div>

          <div id="control-monitor">
            <Control
              power={this.state.power}
              clickPower={this.clickPower}
              clickBank={this.clickBank}
              bank={this.state.bank}
              keyname={this.state.keyname}
              volume={this.state.volume}
              handleVolume={this.handleVolume}
            />
          </div>

          <div> </div>
        </div>
      </div>
    );
  }
}



export default App;
