import React from 'react';
import * as _ from 'lodash';
import {Http,ArticleTitle,Helpers} from '../../components';
const http = new Http();
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            datas: [],
            page: 1
        };
        this.shouldUpdate = this.shouldUpdate.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.setState({
            scrollTop:document.body.scrollTop
        });
        this.getData();

        window.addEventListener("scroll", this.shouldUpdate);
    }

    shouldUpdate() {
        const beforePos = this.state.scrollTop;
        const afterPos = document.documentElement.scrollTop;
        const disTop = afterPos - beforePos;
        this.setState({
            scrollTop: afterPos,
            page: this.state.page + 1
        });
        if(Helpers.isScorllDown() && disTop > 0) {
            this.getData();
        }

    }

    getData() {
        const {page} = this.state;
        http.get('/topics',{
            params: {
                tab:'all',
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

    render() {
        const {dataLoaded,datas} = this.state;

        if(dataLoaded) {
            return (
                <div>
                    <ArticleTitle datas={datas}/>
                </div>
            )
        }else {
            return (
                <div>正在加载···</div>
            )
        }


    }
}