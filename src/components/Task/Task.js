import React, { Component } from 'react';
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import styles from './task.module.css';

class Task extends Component {
    state = {
        selected: false
    }

    handleChange = () => {
        const { data, onToggle } = this.props;
        onToggle(data._id);
        this.setState({
            selected: !this.state.selected,
        });
    };

    render() {
        const task = this.props.data;
        const { selected } = this.state;
        const { disabled, onDelete } = this.props;


        return (

            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <Row>
                        <Col className="text-right">
                            <Form.Check
                                onChange={this.handleChange}
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