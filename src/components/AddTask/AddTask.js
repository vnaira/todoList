import React, { PureComponent } from 'react';
import { InputGroup, Row, Button, FormControl, Modal, Form } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

export default class AddTask extends PureComponent {
    state = {
        title: '',
        description: '',

    }

    //mi tarberak
    // handleChange = (value, name) => {
    //     this.setState({
    //         //vor inputi name ekav, dra value-n el set e anum
    //         [name]: value
    //     })
    // }

    handleChange = (event) => {
        this.setState({
            //vor inputi name ekav, dra value-n el set e anum
            [event.target.name]: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
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
        // this.setState({
        //     title: '',
        //     description: ''
        // })

    }

    render() {
        const { onClose } = this.props;
        const { props } = this;

        return (
            <Modal
                show={true}
                onHide={onClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add new task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <InputGroup className="m-2">
                            <FormControl
                                placeholder="Task title"
                                //sa mi tarberak e
                                //onChange={(event) => this.handleChange(event.target.value, 'title')}
                                onChange={this.handleChange}
                                name="title"
                                onKeyPress={this.handleKeyPress}

                            />
                        </InputGroup>
                        <InputGroup className="m-2">
                            <FormControl
                                as="textarea"
                                row={4}
                                name="description"
                                onChange={this.handleChange}

                            />

                        </InputGroup>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleSubmit}
                        variant="success"
                    >
                        Add
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                </Button>
                </Modal.Footer>
            </Modal>


        );
    }
}
AddTask.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}