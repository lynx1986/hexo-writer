import React from 'react';
import { inject, observer } from 'mobx-react';
import dayjs from 'dayjs';
import { Table, Button, Loading, Pagination, MessageBox, Message, Dialog } from 'element-react';

import styles from './index.module.scss';

const POST_COLUMNS = [
    { label: '标题', prop: 'title' },
    { label: '创建日期', prop: 'date', width: 180 },
    { label: 'slug', prop: 'slug', width: 240 },
    { label: '状态', prop: 'published', width: 180 },
    { label: '分类', prop: 'categories', width: 180 },
    { label: '标签', prop: 'tags', width: 240 },
];

@inject(stores => ({
  post: stores.post
}))
@observer
class Post extends React.Component {

    constructor(props) {
        super(props);

        this.COLUMNS = [
            ...POST_COLUMNS,
            { 
                label: '操作', width: 180,
                render: data => {
                return (
                    <span>
                        <Button plain type='info' size='small' onClick={() => this.handleEdit(data)}>编辑</Button>
                        <Button type='danger' size='small' onClick={() => this.handleRemove(data)}>删除</Button>
                    </span>
                )
            }}
        ];

        this.COLUMNS[1].render = data => <span>{dayjs(data.date).format('YYYY-MM-DD HH:mm')}</span>;
        this.COLUMNS[3].render = data => <span>{data.published ? '已发布' : '未发布'}</span>
        this.COLUMNS[4].render = data => <span>{data.categories.data.join(',')}</span>;
        this.COLUMNS[5].render = data => <span>{data.tags.data.join(',')}</span>;
    }

    componentDidMount() {
        this.props.post.refresh();
    }

    render() {

        return (
            <div>
                { this.renderActionBar() }
                { this.renderTable() }
            </div>
        )
    }

    renderActionBar() {
        return (
          <div className={styles.actionBar}>
            <Button type='primary' onClick={this.handleCreate}>创建</Button>
          </div>
        )
      }

    renderTable() {

        const items = this.props.post.items();
        const page = this.props.post.page();
        const status = this.props.post.status();

        console.log(items);

        return (
            <div style={{width: '100%'}}>
                <Loading className={styles.loading} text='加载中' loading={status.refreshing}>
                    <Table className={styles.table} columns={this.COLUMNS} data={items} stripe />
                </Loading>
                <Pagination 
                    className={styles.pagination} layout='prev, pager, next' 
                    total={page.total} pageSize={page.limit} currentPage={page.current + 1}
                    onCurrentChange={this.handleCurrentChange} />
            </div>
        );
    }

    handleEdit = item => {
        this.props.history.push('/post/' + item.slug);
    }

    handleCreate = () => {
        this.props.history.push('/post/new_post');
    }
}



export default Post;