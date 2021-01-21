import React, { Component } from 'react';
import { InputGroup, Row, Button, FormControl, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //ira mej ka title,description
            ...props.task
        }
    }

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

        this.props.onSave({
            _id: this.state._id,
            title,
            description
        });
    }

    render() {
        const { onClose } = this.props;
        const { title, description } = this.state;

        return (
            <Modal
                show={true}
                onHide={onClose}
                centered
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <InputGroup className="m-2">
                            <FormControl
                                placeholder="Task title"
                                onChange={this.handleChange}
                                name="title"
                                onKeyPress={this.handleKeyPress}
                                value={title}
                            />
                        </InputGroup>
                        <InputGroup className="m-2">
                            <FormControl
                                as="textarea"
                                row={4}
                                name="description"
                                onChange={this.handleChange}
                                value={description}
                            />

                        </InputGroup>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleSubmit}
                        variant="success"
                    >
                        Save
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
EditTask.propTypes = {
    task: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}