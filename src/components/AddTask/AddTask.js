import React, { Component } from 'react';
import { InputGroup, Row, Button, FormControl } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';

export default class AddTask extends Component {
    state = {
        title: '',
        description: '',

    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            //this.addTask();
        }
    }

    handleSubmit = () => {

        const title = this.state.title.trim();
        const description = this.state.description.trim();
        if (!title) {
            return
        }

        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description ? description : 'Task description does not exist'
            //kam vor nuynn e
            //title,
            //description
        };

        this.props.onAdd(newTask);
        this.setState({
            title: '',
            description: ''
        })

    }

    render() {
        const { title, description } = this.state;
        const { disabled } = this.props;

        return (
            <Row>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Task title"
                        onChange={this.handleChange}
                        value={title}
                        onKeyDown={this.handleKeyDown}
                        disabled={disabled}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={this.handleSubmit}
                            disabled={disabled}
                        >
                            Add Task
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Row>
        );
    }
}