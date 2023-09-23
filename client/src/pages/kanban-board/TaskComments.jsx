import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import { Mention, MentionsInput } from 'react-mentions';

const MentionInputStyle = {
  control: {
    backgroundColor: '#fff',
    fontSize: 16,
    // fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace',
      minHeight: 60,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid silver',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 16,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  }
}

const TaskComments = ({
  comment,
  styles,
  onSetComment = () => { }
}) => {
  return (
    <>
    <Row>
        <Col md={12}>
          <MentionsInput
            placeholder="Add Comment. Use '@' for mentions"
            value={comment}
            className='form-control'
            style={MentionInputStyle}
            onChange={(e) => onSetComment(e.target.value)}
            a11ySuggestionsListLabel={'Suggested mentions'}
          >
            <Mention data={[]} />
          </MentionsInput>
        </Col>
        <Col md={12}>
            <Button className={styles.btn_right}>Post Comment</Button>
        </Col>
    </Row>    
    <div className={styles.comment_section}>
        <div className={`card p-3 ${styles.comment_card}`}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='user d-flex flex-row align-items-center'>
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" className={`${styles.user_img} rounded-circle mr-2`} />
                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                </div>
                <small>2 days ago</small>
            </div>
            <p className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className={`card p-3 ${styles.comment_card}`}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='user d-flex flex-row align-items-center'>
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" className={`${styles.user_img} rounded-circle mr-2`} />
                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                </div>
                <small>2 days ago</small>
            </div>
            <p className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className={`card p-3 ${styles.comment_card}`}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='user d-flex flex-row align-items-center'>
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" className={`${styles.user_img} rounded-circle mr-2`} />
                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                </div>
                <small>2 days ago</small>
            </div>
            <p className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className={`card p-3 ${styles.comment_card}`}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='user d-flex flex-row align-items-center'>
                <img src="https://i.imgur.com/hczKIze.jpg" width="30" className={`${styles.user_img} rounded-circle mr-2`} />
                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                </div>
                <small>2 days ago</small>
            </div>
            <p className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>                        
    </div>
    </>
  )
}

export default TaskComments