import React, { Component } from 'react';
import styles from './todo.css';
import Task from '../Task/Task.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../AddTask/AddTask';
import Confirm from '../Confirm';


export default class ToDo extends Component {


    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false
    }

    addTask = (newTask) => {

        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks: tasks,
            // kam vor nuynn e ES6-um
            // tasks, //ete key u proprty nuynn en

        })
    }

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((el) => taskId !== el._id);
        //const newSelectTask = [...this.state.selectedTasks];

        this.setState({
            tasks: newTasks
        });
    }

    toggleTask = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }

        this.setState({
            //sa nuynn e vor selectedTasks:{this.state.selectedTasks}
            selectedTasks
        });
    };


    deleteSelected = () => {
        const { selectedTasks, tasks } = this.state;
        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(), //datarkum enq
            showConfirm: false
        })
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm,
        })
    }

    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id);
        this.setState({
            selectedTasks: new Set(taskIds),
        })
    }

    deselectAll = () => {
        this.setState({
            selectedTasks: new Set(),
        })
    }
    closeModal = () => {
        this.setState({
            showConfirm: false,
        })
    }


    render() {
        // state petq e copy anel heto popoxel u dnel texy
        const { tasks, selectedTasks, showConfirm } = this.state;
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
                    <Task data={el}
                        onToggle={this.toggleTask}
                        disabled={!!selectedTasks.size}
                        onDelete={this.deleteTask}
                        selected={selectedTasks.has(el._id)}
                    />
                </Col>
            )
        })
        return (
            <div>

                <Container>
                    <h2 style={headStyle}>Todo list</h2>
                    <AddTask
                        disabled={!!selectedTasks.size}
                        onAdd={this.addTask}
                    />
                    <Row>
                        <Col>
                            <Button
                                onClick={this.addNewTask}
                                variant="primary"
                            >
                                Add new task
                        </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={this.selectAll}
                                variant="warning"
                                disabled={(selectedTasks.size === tasks.length)}
                            >
                                Select all
                        </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={this.deselectAll}
                                variant="warning"

                            >
                                Deselect all
                        </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={this.toggleConfirm}
                                variant="danger"
                                disabled={!selectedTasks.size}
                            >
                                Delete selected
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        {taskCom}
                    </Row>
                </Container>
                {showConfirm &&
                    <Confirm
                        onConfirm={this.deleteSelected}
                        onClose={this.toggleConfirm}
                        taskCount={selectedTasks.size}
                    />}
            </div>
        )
    }

}