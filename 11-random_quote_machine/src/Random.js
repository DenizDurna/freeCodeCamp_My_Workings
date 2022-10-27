import './Random.css';
import React from 'react';

const randowm = () => {
  return Math.floor(Math.random() * 10);
};

const quotation = [
  {
    id: 1,
    color: "#1ecbe1",
    met: "Savaşın iyisi, barışın kötüsü yoktur.",
    say: "- Benjamin Franklin"
  },
  {
    id: 2,
    color: "#74c43b",
    met: "Hayatta hep mutlu olursam, Hayalini kuracak neyim kalır.",
    say: "- Dostoyevski"
  },
  {
    id: 3,
    color: "#75926d",
    met: "Gülmek için mutlu olmayı beklemeyin belki de gülmeden ölürsünüz.",
    say: "- Victor Hugo"
  },
  {
    id: 4,
    color: "#4c8eb3",
    met:
      "Yorgun olduğumuzda, uzun zaman önce fethettiğimiz fikirlere saldırıyoruz.",
    say: "- Friedrich Nietzsche"
  },
  {
    id: 5,
    color: "#5c5aa5",
    met:
      "Hayatta daima gerçekleri savun! Takdir eden olmasa bile, vicdanına hesap vermekten kurtulursun.”",
    say: "- Che Guevara"
  },
  {
    id: 6,
    color: "#2155de",
    met: "Her insan, yapmadığı tüm iyiliklerden suçludur.”",
    say: "- Voltaire"
  },
  {
    id: 7,
    color: "#853bc4",
    met: "Zihin paraşüt gibidir. Açık değilse işe yaramaz.",
    say: "- Frank Zappa"
  },
  {
    id: 8,
    color: "#b9a646",
    met:
      "Yapmacık olup sevilmektense, kendim olup nefret edilmeyi tercih ederim.",
    say: "-Tom Robbins"
  },
  {
    id: 9,
    color: "#618a9e",
    met:
      "İnsan aklındakilerle gündüzleri, yüreğindekiyle geceleri uğraşıyormuş.",
    say: "- Can Yücel"
  },
  {
    id: 10,
    color: "#3697c9",
    met:
      "Bir gün hayatına birisi girecek ve o gün, daha öncekilerle neden işlerin yürümediğini anlayacaksın.",
    say: "- Elif Şafak"
  }
];

// React
class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newWquotation: quotation[randowm()]
    };
    this.click = this.click.bind(this);
  }

  click() {
    this.setState({
      newWquotation: quotation[randowm()]
    });
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.state.newWquotation.color;
  }

  componentDidUpdate(prevState) {
    if (this.state.newWquotation !== prevState.newWquotation) {
      document.body.style.backgroundColor = this.state.newWquotation.color;
    }
  }

  render() {
    const newW = this.state.newWquotation;
    const tweet = `https://twitter.com/intent/tweet?hashtags=quotes&text=${newW.met} ${newW.say} `;
    const tum = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${newW.say}&content=${newW.met}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    return (
      <div id="quote-box" style={{ color: newW.color }}>
        <div id="text">
          <p><q></q>{newW.met}</p>
        </div>
        <div id="author">
          <p>{newW.say}</p>
        </div>
        <div id="albutton">
          <a
            id="tweet-quote"
            className=" button"
            href={tweet}
            target="_top"
            style={{ backgroundColor: newW.color }}
          ><i class="fa-brands fa-twitter"></i></a>

          <a
            id="tum-quote"
            className="button"
            href={tum}
            target="_top"
            style={{ backgroundColor: newW.color }}
          ><i class="fa-brands fa-tumblr"></i></a>

          <button
            onClick={this.click}
            id="new-quote"
            style={{ backgroundColor: newW.color }}
          >
            Yeni Alıntı
          </button>
        </div>
      </div>
    );
  }
}

export default Random;
