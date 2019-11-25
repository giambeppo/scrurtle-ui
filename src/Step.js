import React, {Component} from 'react';

class Step extends Component {
    render() {
        const turtleClass = this.props.isCurrent ? 'turtle' : 'no-turtle';
        const itemClass = this.props.isLast ? 'last-step' : 'step';
        const text = this.props.isLast ? this.props.lastMessage : this.props.index;
        return (
            <div className="column">
                <div className={turtleClass} />
                <div className={itemClass}>
                    <p className="item">{text}</p>
                </div>
            </div>
        )
    }
}

export default Step;
