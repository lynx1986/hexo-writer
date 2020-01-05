import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Alert, Tag, Button } from 'element-react';
import Markdown from 'for-editor';
import dayjs from 'dayjs';

@inject(stores => ({
    post: stores.post
}))
@observer
export default class Detail extends React.Component {
    
    constructor(props) {
        super(props);

        const { slug } = props.match.params;
        this.post = props.post.items().find(item => item.slug == slug) || {}

        this.state = { content: this.post._content || '' };
    }

    render() {

        const { content } = this.state;

        return (
            <div className='page-content'>
                <Layout.Row type='flex' justify='center'>
                    <Layout.Col>
                        <Markdown height='700px' preview subfield value={content} onChange={this.handleChange}  />
                    </Layout.Col>
                </Layout.Row>
                <div style={{ margin: 20 }} />
                <Layout.Row type='flex' justify='center'>
                    <Button type='primary' onClick={this.handlePublish}>发布</Button>
                </Layout.Row>
            </div>
        )
    }

    handleChange = v => {
        this.setState({ content: v })
    }

    handlePublish = () => {

        const { content } = this.state;

        const time = dayjs().format('HH:mm:ss');

        if (!this.post.slug) {
            this.props.post.create({
                params: {
                    title: 'test_' + time,
                    slug: 'slug_' + time,
                    layout: 'post',
                    date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    content
                }
            });
        }
    }
}