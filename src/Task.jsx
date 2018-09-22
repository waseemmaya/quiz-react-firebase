import React, { Component } from 'react';
import fire from './fire';

class Task extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            text: ''
        }
        this.handleText = this.handleText.bind(this);
        this.addTask = this.addTask.bind(this);
        // this.deleteTask = this.deleteTask.bind(this);


    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.renderTasks()}
            </div>
        );
    }

    componentWillMount() {
        const { list } = this.state;
        let tasks = fire.database().ref('tasks');
        tasks.on("child_added", val => {
            // console.log('valkey', val.key);

            let task = {
                val: val.val(),
                id: val.key
            }
            list.push(task);
            this.setState({
                list
            })
        })


    }

    addTask(e) {
        e.preventDefault();
        const { text } = this.state;
        fire.database().ref('tasks').push(text);
        // console.log('tasks', this.state.list);


    }

    handleText(e) {
        let text = e.target.value;
        this.setState({
            text
        })
    }

    renderForm() {
        return (
            <form onSubmit={this.addTask}>
                <input type="text" onChange={this.handleText} name='input_task' />
                <br />
                <input type="submit" value='submit' />
            </form>
        )
    }

    renderTasks() {
        const { list } = this.state;
        // console.log('list', list);
        return (
            <ul>
                {list.map((val, i) => {
                    return (
                        <li key={i}>
                            {val.val}
                            <button onClick={() => this.deleteTask(val.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    deleteTask = (key) => {
        const { list } = this.state;
        list.map((val, i) => {
            if (val.id === key) {
                console.log('mila');
                let index = i;
                list.splice(index, 1)
                console.log(this.state.list);
                this.setState({
                    list
                })
            } else (
                console.log('nahi mila')
            )
        })


        let deleteTask = fire.database().ref(`tasks/${key}`);
        deleteTask.remove().then(function () {
            console.log("deleting", key);
        });



    }



}


export default Task;