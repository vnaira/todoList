import React, { Component } from 'react';
import styles from './todo.css';
import Task from '../Task/Task.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../AddTask/AddTask';


export default class ToDo extends Component {


    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: new Set()
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
            selectedTasks: new Set() //datarkum enq
        })
    }



    render() {
        // state petq e copy anel heto popoxel u dnel texy
        const { tasks, selectedTasks } = this.state;
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
                        <Button
                            onClick={this.deleteSelected}
                            variant="danger"
                            disabled={!selectedTasks.size}
                        >
                            Delete selected
                        </Button>
                    </Row>
                    <Row>
                        {taskCom}
                    </Row>
                </Container>
            </div>
        )
    }

}