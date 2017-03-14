import React, { Component } from 'react';
import { Tabs, Row, Col, Upload, Icon, Modal } from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

class PCUserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible: false
        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercollection: json
                });
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercomments: json
                });
            });

    };
    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            handler: {
                'Access-Control-Allow-Origin': '*'
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'http://www.qqwangming.org/uploads/71b4fe8ab730e4e3/21.jpg',
                    thumbUrl: 'http://www.qqwangming.org/uploads/71b4fe8ab730e4e3/21.jpg'
                }
            ],
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url,
                    previewVisible: true
                })
            }
        }
        const { usercollection, usercomments } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab='头像设置' key='3'>
                                <div className="clearfix">
                                    <Upload {...props}>
                                        <Icon type='plus' />
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancle={this.handleCancle}>
                                        <img src={this.state.previewImage} alt="预览" />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter />
            </div>
        );
    }
}

export default PCUserCenter;