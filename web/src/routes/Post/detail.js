import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJs } from 'mobx';
import { Layout, Alert, Loading, Button, Message, Dialog, Form, Input } from 'element-react';
import Markdown from 'for-editor';
import TagInput from '../../components/TagInput';

const FORM_RULES = {
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    slug: [{ required: true, message: '请输入页面URL', trigger: 'blur' }]
};

@inject(stores => ({
    post: stores.post,
    tag: stores.tag,
    category: stores.category
}))
@observer
export default class Detail extends React.Component {
    
    constructor(props) {
        super(props);

        const { slug } = props.match.params;
        this.post = props.post.items().find(item => item.slug == slug) || { }

        this.state = { 
            content: this.post._content || '',
            posting: false,
            form: {
                title: this.post.title || '',
                slug: this.post.slug || '',
                tags: this.post.tags || [],
                index_img: this.post.index_img || ''
            }
        };

        this.$vm = React.createRef();
    }

    componentDidMount() {
        this.props.tag.refresh();
        this.props.category.refresh();
        this.props.post.initilizeCos();
    }

    render() {

        const { content, posting, form } = this.state;
        const status = this.props.post.status();
        console.log(form.tags);

        const tags = this.props.tag.items();

        return (
            <div className='page-content'>
                <Loading loading={status.creating} text='提交中，请稍候'>
                    <Layout.Row type='flex' justify='center'>
                        <Layout.Col>
                            <Markdown ref={this.$vm} height='700px' preview subfield value={content} onChange={this.handleChange} addImg={this.handleAddImage} />
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
                            <Form.Item label='标签' prop="tags">
                                <TagInput allTags={tags} tags={form.tags} onAdd={this.handleAddTag} onRemove={this.handleRemoveTag} />
                            </Form.Item>
                            <Form.Item label='首页缩略图' prop="index_img">
                                <Input value={form.index_img} placeholder='图片地址'  onChange={v => this.handleFormChange(v, 'index_img')} />
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

    handleRemoveTag = tagName => {
        const { tags } = this.state.form;
        const index = tags.indexOf(tagName)
        if (index >= 0) {
            tags.splice(index, 1);
        }
        this.setState({
            form: Object.assign({}, this.state.form, { ['tags']: tags })
        });
    }

    handleAddTag = tagName => {
        const { tags } = this.state.form;
        if (tags.indexOf(tagName) < 0) {
            tags.push(tagName);
        }
        this.setState({
            form: Object.assign({}, this.state.form, { ['tags']: tags })
        });
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
            if (valid) {
                this.setState({ posting: false });
                this.handlePublish();
            }
        })
    }

    handleAddImage = file => {
        console.log(file);

        this.props.post.upload({
            params: {
                file
            },
            callback: {
                success: url => {
                    console.log(url);
                    this.$vm.current.$img2Url(file.name, url)
                },
                fail: Message.error('上传失败，请稍后再试')
            }
        });
    }

    handlePublish = () => {

        const { content, form } = this.state;

        const post = { ...form, content };
        if (this.post.hasOwnProperty('id')) {
            post['id'] = this.post.id;
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