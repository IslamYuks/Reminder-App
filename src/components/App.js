import React , {Component} from "react";
import { connect } from "react-redux";
import moment from "moment";
import {add_Reminder , remove_Reminder ,clear_Reminder}  from '../actions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './logo.png'




class App extends Component{
    state = {
        text: '' ,
        date:new Date()
    }

    render_Reminders = () =>{
        const {reminders} = this.props ;
        return(
            <ul className="list-group">
        { reminders.map(reminder => {
            return (
                <li key={reminder.id} className="list-group-item">
                    <div>{reminder.text}</div>
                    <div>{moment(new Date(reminder.date)).fromNow()}</div>
                    <div className="btn btn-danger closeIcon"  onClick={() => this.props.remove_Reminder(reminder.id)}>X</div>
                </li>
            )
        })}
            </ul>
        )
        
    }
    render(){
        console.log(this.props);
        return(
           <div className="App">
                <img src={logo}/>
                <div className="reminder-title">
                    <h2>What Shoud ou Do</h2>

                </div>
                <input 
                className="form-control"
                type='text'
                value={this.state.text}
                placeholder="Enter What ou Think...?"
                onChange={(e) => this.setState({text : e.target.value})}
                />
                
                <DatePicker
                    className="form-control "
                    value={this.state.date}
                    selected={this.state.date}
                    placeholderText=""
                    onChange={(date) => {this.setState({date : date})}}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />

                <button 
                onClick = {() => {
                    this.props.add_Reminder(this.state.text,this.state.date)
                    this.setState({text : "", date : new Date()})
                }
                }
                className="btn btn-primary"
                >
                Add Reminder
                </button>
                {this.render_Reminders()}
                <button 
                className="btn btn-danger" onClick={() => this.props.clear_Reminder()}>
                Clear Reminders
                </button>

           </div>
        )
    }
}


// function mapDispatchToProps(dispatch){
//     return {
//         add_Reminder : () => dispatch(add_Reminder())
//     }
// }

// function mapStateToProps(state) {
//     return{
//         reminders : state
//     }
// }
export default connect( state =>{return{reminders : state}}, {add_Reminder , remove_Reminder , clear_Reminder} )(App)
