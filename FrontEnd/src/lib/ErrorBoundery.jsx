import React, { Component } from "react";

export class ErrorBoundery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true , error:error, errorInfo:null};
  }
  componentDidCatch(error, info) {
    console.log("Error Boundary caught an error:",error, info);
    this.setState({ errorInfo: info });
  }
  render() {
    if (this.state.hasError) {
        return (
            <div>
              <h2>Something went wrong.</h2>
              <details>
                {this.state.error && <p>{this.state.error.message}</p>}
                {this.state.errorInfo && <pre>{this.state.errorInfo.componentStack}</pre>}
              </details>
            </div>
          );
    }
    return this.props.children;
  }
}

export default ErrorBoundery;
