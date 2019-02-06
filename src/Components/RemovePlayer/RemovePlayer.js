import React, {Component} from 'react'
import {PageHeader, FormGroup, FormControl, Button} from 'react-bootstrap'
import {withRouter} from "react-router-dom";
import {server} from '../../Server/serverApi'
class RemovePlayer extends Component {

    state = {
        validationStatus: "error",
        allow: false,
        value: ""
    }

    handleChange = (e) => {
        let check = null;
        check = this
            .props
            .mainstate
            .players
            .find(player => player.value === e.target.value.split(" ").join(""))
        let x = check === undefined
            ? "error"
            : "success"
        this.setState({
            validationStatus: x,
            allow: x === "success"
                ? true
                : false,
            value: e.target.value
        })
    }

    removeClicked = (value) => {
        const temp = [...this.props.mainstate.players]
        const deletedPlayer=this.props.mainstate.players.find(el=>el.value===value)
        this.props.mainstate.players = [...temp.filter(player => player.value !== value.split(" ").join(""))]
        server(deletedPlayer,'deletePlayer')
        this.props
            .setSt({backdropVisibility: "visible", textOfBackdrop: "Succefully removed player!"})
        this
            .props
            .history
            .push('/')
    }

    render() {
        return (
            <div id="container">
                {/* {Header} */}
                <PageHeader className="tracking-in-expand-fwd-top" id="header">Remove Player</PageHeader>
                {/* {Form for remove player with input and button} */}
                <form id="myForm">
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.state.validationStatus}>
                        <FormControl
                            type="text"
                            maxLength={20}
                            value={this.state.value}
                            placeholder="Enter Player Name"
                            onChange={this.handleChange}/>
                        <FormControl.Feedback/>
                    </FormGroup>
                </form>
                <Button
                    onClick={() => this.removeClicked(this.state.value)}
                    className={this.state.allow === true
                    ? "jello-diagonal-2"
                    : null}
                    bsStyle="primary"
                    type='submit'
                    disabled={!this.state.allow}>
                    <i className="fas fa-minus">&nbsp; Remove</i>
                </Button>
            </div>
        )
    }
}

export default withRouter(RemovePlayer);