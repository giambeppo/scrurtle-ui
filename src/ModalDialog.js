import React from 'react';

class ModalDialog extends React.Component {

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClose);
  }

  handleClose(event) {
    if (this.props.show && !this.dialog.contains(event.target) && this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="modal-backdrop" onClick={this.handleClose}>
        <div className="modal" ref={node => this.dialog = node}>
          <h1>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ModalDialog;