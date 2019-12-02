import React from 'react';

class YesNoInput extends React.Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onYes();
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.onNo();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
        <input type="submit" value="Yes" />
        <input type="reset" value="No"/>
      </form>
    );
  }
}

export default YesNoInput;