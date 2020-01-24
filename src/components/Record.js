import React from 'react';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


class Record extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            isActive: false,
            secondsForTimer: this.props.item.secondsForTimer,
        };


        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.rendDefault = this.rendDefault.bind(this);
        this.rendEdit = this.rendEdit.bind(this);

        this.getHours = this.getHours.bind(this);
        this.getMinutes = this.getMinutes.bind(this);
        this.getSeconds = this.getSeconds.bind(this);
        this.startTime = this.startTime.bind(this);
        this.pauseTime = this.pauseTime.bind(this);

    }

    edit() {
        this.setState({ edit: true })
    }

    save() {
        this.props.changeName(this.refs.textar.value, this.props.index);
        this.setState({ edit: false })
    }

    remove() {
        clearInterval(this.countdown);
        this.setState({ isActive: false });
        this.props.changeStatus(false, this.props.index);
        this.props.deleteRecord(this.props.index);
    }

    getHours() {
        return ("0" + Math.floor(this.state.secondsForTimer / 3600)).slice(-2);
    }

    getMinutes() {
        return ("0" + Math.floor((this.state.secondsForTimer % 3600) / 60)).slice(-2);
    }

    getSeconds() {
        return ("0" + (this.state.secondsForTimer % 60)).slice(-2);
    }

    startTime() { 
        this.setState({ isActive: true });
        this.props.changeStatus(true, this.props.index);
        this.countdown = setInterval(() => {
            this.setState(({ secondsForTimer }) => ({
                secondsForTimer: this.props.item.secondsForTimer + 1
            }));     
            this.props.changeSeconds(this.state.secondsForTimer, this.props.index);   
        }, 1000);
        
    };

    pauseTime() {
        clearInterval(this.countdown);
        this.setState({ isActive: false });
        this.props.changeStatus(false, this.props.index);
      };

    componentDidMount() { 
        this.props.item.statusRecord ? this.startTime() : null     
    }

    rendDefault() { 
        var backgroundRecord = this.state.isActive ? '#fdfdf6' : null;
        var colorRecord = this.state.isActive ? '#3faf6c' : null; 
        return (
            <div className="box" style={{backgroundColor: backgroundRecord}}>
                <div className="child" data-first style={{color: colorRecord}}>{this.props.item.name}</div>
                <div className="child" style={{color: colorRecord}}>
                    <span className="bloc-timer"> {this.getHours()}</span>
                    <span className="bloc-timer"> :{this.getMinutes()}</span>
                    <span className="bloc-timer"> :{this.getSeconds()}</span>  
                </div>
                {this.state.isActive ? 
                    <PauseCircleOutlineIcon className="child" onClick={this.state.isActive ? this.pauseTime : this.startTime}/> 
                    : 
                    <PlayCircleOutlineIcon className="child" onClick={this.state.isActive ? this.pauseTime : this.startTime}/>
                }
                <EditIcon onClick={this.edit} className="child" />
                <RemoveCircleOutlineIcon onClick={this.remove} className=" btn red child" />
            </div>
        );
    }

    rendEdit() {
        return (
            <div className="box">
                <textarea ref="textar" className="child" defaultValue={this.props.item.name}></textarea>
                <CheckCircleOutlineIcon onClick={this.save} className="btn green" />
            </div>
        );
    }

    render() {
        if (this.state.edit) {
            return this.rendEdit();
        } else {
            return this.rendDefault();
        }

    }
}

export default Record;
