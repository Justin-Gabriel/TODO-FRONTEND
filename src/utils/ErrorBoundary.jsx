/* eslint-disable react/prop-types */
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return  (
                <div>
                    <h1>Oops!!!!</h1>
                    <h2>Something went wrong</h2>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
