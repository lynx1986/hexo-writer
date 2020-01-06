import React from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Alert, Loading, Button, Message, Dialog, Form, Input } from 'element-react';
import Markdown from 'for-editor';
import dayjs from 'dayjs';

const FORM_RULES = {
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    slug: [{ required: true, message: '请输入页面URL', trigger: 'blur' }]
};

@inject(stores => ({
    post: stores.post
}))
@observer
export default class Detail extends React.Component {
    
    constructor(props) {
        super(props);

        const { slug } = props.match.params;
        this.post = props.post.items().find(item => item.slug == slug) || {}

        this.state = { 
            content: this.post._content || '',
            posting: false,
            form: {
                title: this.post.title || '',
                slug: this.post.slug || ''
            }
        };
    }

    render() {

        const { content, posting, form } = this.state;
        const status = this.props.post.status();

        return (
            <div className='page-content'>
                <Loading loading={status.creating} text='提交中，请稍候'>
                    <Layout.Row type='flex' justify='center'>
                        <Layout.Col>
                            <Markdown height='700px' preview subfield value={content} onChange={this.handleChange} addImg={this.handleAddImage} />
                        </Layout.Col>
                    </Layout.Row>
                </Loading>
                <div style={{ margin: 20 }} />
                <Layout.Row type='flex' justify='center'>
                    <Button onClick={this.props.history.goBack}>返回</Button>
                    <Button disabled={status.creating} type='primary' onClick={() => this.setState({ posting: true })}>发布</Button>
                </Layout.Row>
                <Dialog title='提交文章' visible={posting} onCancel={() => this.setState({ posting: false })}>
                    <Dialog.Body>
                        <Form ref='form' model={form} rules={FORM_RULES} labelWidth={100}>
                            <Form.Item label='文章标题' prop="title">
                                <Input value={form.title}  onChange={v => this.handleFormChange(v, 'title')} />
                            </Form.Item>
                            <Form.Item label='文章URL' prop="slug">
                                <Input value={form.slug} placeholder='例如：hello-world'  onChange={v => this.handleFormChange(v, 'slug')} />
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button onClick={() => this.setState({ posting: false})}>取消</Button>
                        <Button type='primary' onClick={this.handleSubmit}>发布</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }

    handleFormChange = (v, fieldProp) => {
        this.setState({
            form: Object.assign({}, this.state.form, { [fieldProp]: v })
        });
    }

    handleChange = v => {
        this.setState({ content: v })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.refs.form.validate(valid => {
            console.log('validation valid=' + valid);
            if (valid) {
                this.setState({ posting: false });
                this.handlePublish();
            }
        })
    }

    handleAddImage = e => {
        console.log(e);
    }

    handlePublish = () => {

        const { content, form } = this.state;

        const post = { ...form, content };
        if (this.post.hasOwnProperty('_id')) {
            post['_id'] = this.post._id;
        }

        this.props.post.create({
            params: post,
            callback: {
                success: () => {
                    Message({
                        type: 'success',
                        message: '提交成功',
                        duration: 1500,
                        onClose: () => this.props.history.goBack()
                    })
                },
                fail: () => Message.error('提交失败，请稍后再试')
            }
        });
    }
}