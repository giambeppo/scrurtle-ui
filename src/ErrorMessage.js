import React, {Component} from 'react';

class ErrorMessage extends Component {
    render() {
        if (!this.props.errorMessage) {
            return null;
        }
        return (
            <div className="error-message">
                <strong>{this.props.errorMessage}</strong>
            </div>
        )
    }
}

export default ErrorMessage;
