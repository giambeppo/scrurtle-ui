import React, {Component} from 'react';
import Step from './Step';

class Path extends Component {
    render() {
        const steps = [...Array(this.props.size).keys()].map((number) => {
            const isLast = number === this.props.size - 1;
            const isCurrent = number === this.props.current;
            return <Step key={number} index={number+1} isLast={isLast} isCurrent={isCurrent} />
        });
        return (
            <div className="row">
                {steps}
            </div>
        )
    }
}

export default Path;
