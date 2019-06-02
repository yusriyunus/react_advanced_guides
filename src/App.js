import React, { Component, createRef, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.toogleContainer = createRef();
    this.state = { isOpen: false };
    this.timeOutId = null;
  }

  componentDidMount() {
    // window.addEventListener("click", this.onCLickOutsideHandler);
  }

  componentWillUnmount() {
    // window.removeEventListener("click", this.onCLickOutsideHandler);
  }

  onClickHandler = () => {
    this.setState(currentState => ({ isOpen: !currentState.isOpen }));
  };

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  };

  // If a child receives focus, do not close the popover.
  onFocusHandler = () => {
    clearTimeout(this.timeOutId);
  };

  onCLickOutsideHandler = event => {
    const { isOpen } = this.state;

    isOpen &&
      !this.toogleContainer.current.contains(event.target) &&
      this.setState({ isOpen: false });
  };

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    const { isOpen } = this.state;
    return (
      // <div className="App" ref={this.toogleContainer}>
      //   <button onClick={this.onClickHandler}>Select an option</button>
      <Fragment>
        <div
          className="App"
          onBlur={this.onBlurHandler}
          onFocus={this.onFocusHandler}
        >
          <button
            onClick={this.onClickHandler}
            aria-haspopup="true"
            aria-expanded={this.state.isOpen}
          >
            Select an option
          </button>
          {isOpen ? (
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
          ) : null}
        </div>
        <div className="App">
          <button
            onClick={this.onClickHandler}
            aria-haspopup="true"
            aria-expanded={this.state.isOpen}
          >
            Select an option
          </button>
        </div>
      </Fragment>
    );
  }
}

export default App;
