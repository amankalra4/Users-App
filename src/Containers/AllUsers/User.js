import Axios from 'axios';
import React, { PureComponent } from 'react';
import { ALL_USERS_API } from '../../constants/URL';
import Spinner from '../../Spinner/Spinner';
import './User.css';

class User extends PureComponent {
    state = {
        loadingUsers: true,
        data: {},
        value: 'none'
    }

    componentDidMount() {
        Axios.get(ALL_USERS_API)
        .then(resultData => {
            this.setState({data: resultData.data});
            this.setState({loadingUsers: false});
        })
        .catch(error => console.log('Error while retrieving all Users data is: ', error))
    }

    handleClick = (id) => {
        this.props.history.push(`/${id}`);
    }

    handleChange = (event) => {
        let filterData = { ...this.state.data };
        if(event.target.value === 'first') {
            filterData.data.sort((a, b) => {
                let firstName1 = a.first_name.toUpperCase();
                let firstName2 = b.first_name.toUpperCase();
                if (firstName1 < firstName2) {
                    return -1;
                }
                if (firstName1 > firstName2) {
                    return 1;
                }
                return 0;
            });
        }
        else if(event.target.value === 'last') {
            filterData.data.sort((a, b) => {
                let lastName1 = a.last_name.toLowerCase();
                let lastName2 = b.last_name.toLowerCase();
                if (lastName1 < lastName2) {
                    return -1;
                }
                if (lastName1 > lastName2) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState({data: filterData})
        this.setState({value: event.target.value});
    }

    render() {
        let usersData = null, displayDropDown = null;
        let displayData = this.state.data;
        if(!this.state.loadingUsers) {
            usersData = 
                displayData.data.map(mapData => (
                    <div key = {mapData.id} 
                         className = 'users-border' 
                         onClick = {() => this.handleClick(mapData.id)}>
                        <img src = {mapData.avatar} alt = {mapData.first_name} />
                        <p><b>First Name:</b> {mapData.first_name}</p>
                        <p><b>Last Name:</b> {mapData.last_name}</p>
                    </div>
                    ));
            displayDropDown = (
                <select value = {this.state.value} onChange = {this.handleChange}>
                    <option value = 'none'>None</option>
                    <option value = 'first'>First Name</option>
                    <option value = 'last'>Last Name</option>
                </select>
            );
        }
        return (
            <React.Fragment>
                {displayDropDown}
                <div className = 'parent-div'>
                    {this.state.loadingUsers ? <Spinner /> : usersData}
                </div>
            </React.Fragment>
        );
    }
}

export default User;
