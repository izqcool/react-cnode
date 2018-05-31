import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {Helpers} from '../../classes';
import {Http,ArticleList,Loading,ToolButton,Login} from '../../components';
const http = new Http();

const routeList = ['/','/home','/good','/ask','/share','/job'];

export class Home extends React.Component {

    static propTypes = {
      tab: PropTypes.string.isRequired
    };
    static defaultProps = {
        tab: 'all'
    };

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            showLogin: false,
            datas: [],
            page: 1
        };
        this.shouldUpdate = this.shouldUpdate.bind(this);
        this.getData = this.getData.bind(this);
        this.onShowLogin = this.onShowLogin.bind(this);
        this.onCloseLogin = this.onCloseLogin.bind(this);
    }

    componentDidMount() {
        this.setState({
            scrollTop:document.body.scrollTop,
        });
        this.getData();

        window.addEventListener("scroll", this.shouldUpdate);
    }

    shouldUpdate() {
        const {history} = this.props;
        const pathName = history.location.pathname;
        const beforePos = this.state.scrollTop;
        const afterPos = document.documentElement.scrollTop;
        const disTop = afterPos - beforePos;
        this.setState({
            scrollTop: afterPos
        });
        if(Helpers.isScorllDown() && disTop > 0 && _.includes(routeList,pathName)) {
            const newPage = this.state.page + 1;
            this.setState({
                page: newPage
            });
            this.getData();
        }

    }

    getData() {
        const {tab} = this.props;
        const {page} = this.state;
        http.get('/topics',{
            params: {
                tab,
                limit: 15,
                page
            }
        }).then((res)=> {
            let refreshData;
            if(page === 1) {
                refreshData = res.data;
            }else {
                refreshData = _.concat(this.state.datas,res.data);
            }
            console.log(refreshData);
            this.setState({
                datas: refreshData
            });
            if(res.success) {
                this.setState({
                    dataLoaded: true
                })
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    onShowLogin() {
        this.setState({
            showLogin: true
        });
    }

    onCloseLogin() {
        this.setState({
            showLogin: false
        });
    }
    render() {
        const {history} = this.props;
        const {dataLoaded,datas,showLogin} = this.state;
        const loginUser = JSON.stringify(window.localStorage.getItem('cnodeUser'));
        const isLogin = loginUser ? true: false;
        console.log(isLogin);
        console.log(loginUser);
        if(dataLoaded) {
            return (
                <div>
                    <ArticleList datas={datas} history={history}/>
                    <ToolButton type="login" onButtonClick={this.onShowLogin} isLogin={isLogin} loginUser={loginUser}/>
                    {
                        showLogin ? (
                            <Login onCancel={this.onCloseLogin}/>
                        ) : (null)
                    }

                </div>
            )
        }else {
            return (
                <Loading/>
            )
        }


    }
}