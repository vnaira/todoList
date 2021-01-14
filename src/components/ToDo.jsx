import React, { Component } from "react";
import idGenerator from '../helpers/idGenerator';
import styles from './todo.css';
import { Col, Form, Card, Button, Row, InputGroup, FormControl, Container } from 'react-bootstrap';

export default class ToDo extends Component {
    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: [],
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    addTask = () => {
        const inputValue = this.state.inputValue.trim();
        if (!inputValue) {
            return
        }

        const newTask = {
            _id: idGenerator(),
            title: inputValue,
            description: 'Task description'
        };

        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks: tasks,
            // kam vor nuynn e ES6-um
            // tasks, //ete key u proprty nuynn en
            inputValue: ''
        })
    }

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((el) => taskId != el._id);
        this.setState({
            tasks: newTasks
        });
    }

    selectTask = (taskId) => {
        //const selTask = [...this.state.selectedTasks, taskId];
        const selTask = new Set(this.state.selectedTasks);
        if (selTask.has(taskId)) {
            selTask.delete(taskId)
        } else {
            selTask.add(taskId);
        }

        this.setState({
            selectedTasks: Array.from(selTask),
        })
    }

    render() {
        // state petq e copy anel heto popoxel u dnel texy
        const { tasks, inputValue } = this.state;
        const headStyle = {
            color: 'red',
            fontSize: '25px'
        }
        const taskCom = tasks.map((el) => {
            const classes = [styles.task];
            return (
                <Col
                    xl={2}
                    lg={3}
                    sm={6}
                    md={4}
                    key={el._id}
                >
                    <Card className="mt-3 mb-3">
                        <Card.Body>
                            <Row>
                                <Col className="text-right">
                                    <Form.Check
                                        onChange={() => this.selectTask(el._id)}
                                    />
                                </Col>
                            </Row>

                            <Card.Title>{el.title}</Card.Title>
                            <Card.Text>
                                {
                                    el.description
                                }
                            </Card.Text>
                            <Button variant="danger"
                                onClick={() => this.deleteTask(el._id)}>
                                Delete task
                            </Button>
                        </Card.Body>
                    </Card>

                </Col>
            )
        })
        return (
            <div>

                <Container>
                    <h2 style={headStyle}>Todo list</h2>
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Input your task"
                                onChange={this.handleChange}
                                value={inputValue}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={this.addTask}
                                >Add Task</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                    <Row>
                        {taskCom}
                    </Row>
                </Container>
            </div>
        )
    }

}