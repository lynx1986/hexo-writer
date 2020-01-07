import React from 'react';
import { Tag, Button, Input, Popover } from 'element-react';

import './index.scss';

class TagInput extends React.Component {

    static defaultProps = {
        tags: []
    };

    constructor(props) {
        super(props);

        this.state = { editing: false, newTag: '' };
    }

    render() {

        const { onRemove, tags, allTags } = this.props;
        const { editing, newTag } = this.state;

        return (
            <div>
                {
                    tags.map(tag => 
                        <Tag className='tag-item' type='warning' key={Math.random()} closable onClose={() => onRemove(tag)} >{tag}</Tag>
                    )
                }
                {
                    editing ?
                        <Input
                            className='tag-input'
                            value={newTag}
                            autoFocus
                            ref='input'
                            size='mini'
                            onChange={v => this.setState({ newTag: v })}
                            onKeyUp={this.handleKeyUp}
                            onBlur={this.confirmInput} />
                        :
                        <Button size='small' onClick={() => this.setState({ editing: true })}>+&nbsp;添加标签</Button>
                }
                {
                    editing ?
                        <div className='tag-selections'>
                            { allTags.map(tag => 
                                <span key={tag.id} onClick={() => this.handleAddExsitTag(tag.name)}>
                                    <Tag className='tag-item tag-option' type='success'>{tag.name}</Tag>
                                </span>
                            )}
                        </div> :
                        <span />
                }
            </div>
        )
    }

    handleKeyUp = e => {
        
        if (e.keyCode == 13) {
            this.confirmInput();
        }
    }

    handleAddExsitTag = tag => {
        console.log('handleAddExistTag', tag);
        this.props.onAdd(tag);
    }

    confirmInput = e => {
        const { newTag } = this.state;
        if (newTag != '') {
            this.props.onAdd(newTag);
        }

        setTimeout(() => this.setState({ newTag: '', editing: false }), 150);
    }
}

export default TagInput;