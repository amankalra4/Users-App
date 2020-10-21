import React, { PureComponent } from 'react';
import Axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { SINGLE_USER_API } from '../../constants/URL';
import './UserData.css';

class UserData extends PureComponent {
    state = {
        loadingSingleUser: true,
        data: {}
    }

    componentDidMount() {
        let param = SINGLE_USER_API.replace('%s', this.props.match.params.userId);
        Axios.get(param)
        .then(result => {
            this.setState({data: result.data});
            this.setState({loadingSingleUser: false});
        })
        .catch(error => console.log('Error while retrieving single user data is: ', error));
    }
    
    render() {
        let outputData = this.state.data;
        return (
            <div>
                {
                    this.state.loadingSingleUser 
                    ? 
                        <Spinner /> 
                    : 
                        <div>
                            <p><b>{outputData.data.first_name} {outputData.data.last_name}</b></p>
                            <img className = 'userImg' 
                                 src = {outputData.data.avatar} 
                                 alt = {outputData.data.first_name} />
                            <p><b>Email id:</b> {outputData.data.email}</p>
                        </div>
                }
            </div>
        );
    }
}

export default UserData;
