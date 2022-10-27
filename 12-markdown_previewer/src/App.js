import './App.css';
import React from 'react';
import { marked } from 'marked';
import  Prism  from 'prismjs';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const TEXT = `# Welcome to my React Markdown Previewer!
 
## This is a sub-heading...
## And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!

Or _italic_.
Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header | Crazy Header | Another Header?|
| ------------ | ------------- | -------------|
| Your content can | be here, and it | can be here....|
| And here. | Okay. | I think we get it.|


- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const Edtr = (props) => {
  return (
    <div>
      <h1 className="al title">
        <label for="uptextarea"> </label>
        <i className="fa fa-brands fa-free-code-camp"></i> Editör{" "}
        <i className={props.style} onClick={props.onClick}></i>
      </h1>
      <textarea
        id="editor"
        className="al ground dafault"
        value={props.value}
        onChange={props.onChange}
        name="uptextarea"
      ></textarea>
    </div>
  );
};

const Prwr = (props) => {
  return (
    <div>
      <h1 className="al title" id="preview">
        <i className="fa fa-brands fa-free-code-camp"></i> Previewer{" "}
        <i className={props.style} onClick={props.onClick}></i>
      </h1>
      <div
        className="al ground"
        dangerouslySetInnerHTML={{
          __html: marked(props.value, { renderer: renderer })
        }}
      ></div>
      <div id="dwnpre"></div>
    </div>
  );
};

const Default = (props) => {
  return (
    <div>
      <div id={props.editorStyle}>
        <Edtr
          value={props.value}
          onChange={props.onChange}
          onClick={props.onClickEdtr}
          style={props.style}
          editorStyle={props.editorStyle}
        />
      </div>

      <div id={props.previewerStyle}>
        <Prwr
          value={props.value}
          onClick={props.onClickPrw}
          style={props.style}
        />
      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: TEXT,
      screen: "default",
      style: "fa-solid fa-maximize bigsmall",
      editorStyle: "uparea",
      previewerStyle: "dwnpre"
    };
    this.handleChange = this.handleChange.bind(this);
    this.clickedtr = this.clickedtr.bind(this);
    this.clickprw = this.clickprw.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  clickedtr() {
    this.setState((state) => {
      if (state.screen === "default") {
        return {
          screen: "editorscreen",
          style: "fa-solid fa-down-left-and-up-right-to-center bigsmall",
          editorStyle: "GreatEditor",
          previewerStyle: "none"
        };
      } else {
        return {
          screen: "default",
          style: "fa-solid fa-maximize bigsmall",
          editorStyle: "uparea",
          previewerStyle: "dwnpre"
        };
      }
    });
  }

  clickprw() {
    this.setState((state) => {
      if (state.screen === "default") {
        return {
          screen: "Prwrscreen",
          style: "fa-solid fa-down-left-and-up-right-to-center bigsmall",
          editorStyle: "none",
          previewerStyle: "dwnpre"
        };
      } else {
        return {
          screen: "default",
          style: "fa-solid fa-maximize bigsmall",
          editorStyle: "uparea",
          previewerStyle: "dwnpre"
        };
      }
    });
  }

  render() {
    return (
      <div>
        <Default
          value={this.state.value}
          onChange={this.handleChange}
          onClickEdtr={this.clickedtr}
          onClickPrw={this.clickprw}
          style={this.state.style}
          editorStyle={this.state.editorStyle}
          previewerStyle={this.state.previewerStyle}
        />
      </div>
    );
  }
}


export default App;
