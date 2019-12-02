import React from 'react';

class SingleValueInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onValueSubmitted(this.state.value);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} />
        <input type="submit" value="Go!" />
      </form>
    );
  }
}

export default SingleValueInput;