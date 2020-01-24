import React, { Component } from "react";
import Record from './Record';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import '../styles/Trecker.css';

class Trecker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: [],
            inputName: 'Default name' 
        };

        this.addRecord = this.addRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.changeName = this.changeName.bind(this);
        this.mapRecords = this.mapRecords.bind(this);
        this.inputName = this.inputName.bind(this);
        this.changeSeconds = this.changeSeconds.bind(this);
        this.changeStatus = this.changeStatus.bind(this);        
        this.rememberRecords = this.rememberRecords.bind(this);
    }

    changeStatus(value, i) {
        let records = this.state.records;
        records[i] = {...records[i], statusRecord: value};  
        this.setState({ records });
        this.rememberRecords();
    }

    changeSeconds(value, i) { 
        let records = this.state.records;
        records[i] = {...records[i], secondsForTimer: value};  
        this.setState({ records }); 
        this.rememberRecords();      
    }
    
    changeName(value, i) {
        let records = this.state.records;
        records[i] = {...records[i], name: value};
        this.setState({ records });
        this.rememberRecords();
    }

    addRecord(text) {
        let arr = this.state.records;
        arr.push({name: text, secondsForTimer: 0, statusRecord: true });
        this.setState({ records: arr });
        const { records } = this.state; 
        this.rememberRecords();       
    }   

    deleteRecord(i) {
        let arr = this.state.records;
        arr.splice(i, 1);
        this.setState({ records: arr });
        this.rememberRecords();
    }

    inputName(value){
        this.setState({ inputName: value });
    } 


    mapRecords(item, i) {
        return (
            <Record key={i} index={i} item={item} 
                changeName={this.changeName} 
                deleteRecord={this.deleteRecord}
                changeSeconds={this.changeSeconds}
                changeStatus={this.changeStatus}
            />
        );
    }

    rememberRecords() { 
        localStorage.setItem('rememberRecords', JSON.stringify(this.state.records));      
    }

    componentDidMount() { 
        let records = JSON.parse(localStorage.getItem('rememberRecords')); 
        localStorage.getItem('rememberRecords') === null ? this.setState({ records:[] }) : this.setState({ records });
          
        
    }

    render() {
        return (
            <div className="field">
                <div className="title">tracker</div>

                <Paper className="searchForm">
                    <InputBase ref="inputName"
                        placeholder="Enter tracker name"
                        inputProps={{ 'aria-label': 'Enter tracker name' }}
                        onChange={value => this.inputName(value.target.value)}
                    />
                    <IconButton type="submit" aria-label="search">
                        <PlayCircleFilledIcon onClick={this.addRecord.bind(null, this.state.inputName)} className="btn new" />
                    </IconButton>
                </Paper>

                
                {this.state.records.map(this.mapRecords)}
            </div>
        );
    }
}

export default Trecker;
