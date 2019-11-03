import React, {Component} from 'react';

class ErrorMessage extends Component {
    render() {
        if (!this.props.errorMessage) {
            return null;
        }
        let tryAgain;
        if (this.props.tryAgain) {
            tryAgain = (
                <div>
                    <br/>
                    Please try again in a few minutes.
                </div>
            )
        }
        return (
            <div>
                <strong>{this.props.errorMessage}</strong>
                {tryAgain}
            </div>
        )
    }
}

export default ErrorMessage;
