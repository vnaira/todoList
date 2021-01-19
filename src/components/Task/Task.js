import React, { Component } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.css';
import PropTypes from 'prop-types';


class Task extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        onToggle: PropTypes.func.isRequired,
        disabled: PropTypes.bool.isRequired,
        onDelete: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired
    }

    handleChange = () => {
        const { data, onToggle } = this.props;
        onToggle(data._id);

    };

    render() {
        const task = this.props.data;
        const { disabled, onDelete, selected } = this.props;


        return (

            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <Row>
                        <Col className="text-right">
                            <Form.Check
                                onChange={this.handleChange}
                                checked={selected}
                            />
                        </Col>
                    </Row>

                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        {
                            task.description
                        }
                    </Card.Text>
                    <Button variant="danger"
                        onClick={() => onDelete(task._id)}
                        disabled={disabled}
                    >
                        Delete task
                            </Button>
                </Card.Body>
            </Card>
        );
    }
}
export default Task;