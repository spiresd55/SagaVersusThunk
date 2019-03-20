import * as React from "react";
import {connect} from "react-redux";
import logo from './logo.svg';
import './App.css';
import {countSelector, profileSelector} from "./store/Counter/counterSelectors";
import {Toolbar, Button, Grid, Typography} from "@material-ui/core";
import {
    decrementCounter,
    incrementAsync,
    incrementAsyncThrottle,
    incrementAsyncThunk,
    incrementByThree,
    incrementByFive,
    incrementCounter
} from "./store/Counter/counterActions";

interface ComponentProps {
    count: number;
    increment: any;
    decrement: any;
    incrementAsync: any;
    incrementAsyncThrottle: any;
    incrementAsyncThunk: any;
    incrementByThree: any;
    incrementByFive: any;
    profile: any;
}

class App extends React.Component<ComponentProps> {
  constructor(props: ComponentProps) {
      super(props);
  }

  render() {
    return (
      <div className="App">
          <Toolbar>
              <Button color={"secondary"} variant={"contained"} onClick={this.props.increment}>Increment</Button>
              <Button color={"secondary"} variant={"contained"} onClick={this.props.decrement}>Decrement</Button>
              <Button color={"secondary"} variant={"contained"} onClick={this.props.incrementAsync}>++ Async Saga</Button>
              <Button color={"secondary"} variant={"contained"} onClick={this.props.incrementAsyncThrottle}>++ Async(Throttle)</Button>
              <Button color={"secondary"} variant={"contained"} onClick={this.props.incrementAsyncThunk}>++ Async Thunk</Button>
              <Button color={"secondary"} variant={"contained"} onClick={() => this.props.incrementByThree(this.props.count)}>++ By Three</Button>
              <Button color={"secondary"} variant={"contained"} onClick={() => this.props.incrementByFive(this.props.count)}>++ By Five</Button>
          </Toolbar>
          <Grid container justify={"center"}>
              <Grid xs={6}>
                  {this.props.profile &&
                    <Typography variant={"h1"}>{this.props.profile.firstName} {this.props.profile.lastName}</Typography>
                  }
                  <Typography variant={"h2"}>Count</Typography>
                  <Typography variant={"h4"}>{this.props.count}</Typography>
              </Grid>
          </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
    return {
        count: countSelector(state),
        profile: profileSelector(state)
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        increment: () => dispatch(incrementCounter()),
        decrement: () => dispatch(decrementCounter()),
        incrementAsync: () => dispatch(incrementAsync()),
        incrementAsyncThrottle: () => dispatch(incrementAsyncThrottle()),
        incrementAsyncThunk: () => dispatch(incrementAsyncThunk()),
        incrementByThree: (orig: number) => dispatch(incrementByThree(orig)),
        incrementByFive: (orig: number) => dispatch(incrementByFive(orig))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
