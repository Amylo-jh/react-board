import axios from 'axios';
import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BoardWrite = () => {
    const [form, setForm] = useState({
        title: '',
        contents: '',
        writer: ''
    })
    const {title, content, writer} = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = async() => {
        if(title === ''){
            alert('제목을 입력하세요');
        }
        else if(writer === ''){
            alert('작성자를 입력하세요');
        }
        else if(content === ''){
            alert('내용을 입력하세요');
        }
        else{
            if(window.confirm('게시글을 등록하시겠습니까?')){
                await axios.post('/insert', form);
                window.location.href="/";
            }
        }
    }

    const onReset = () => {
        setForm({
            ...form,
            title: '',
            contents: '',
            writer: ''
        })
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className="text-center my-5">게시글 작성</h1>
                <Form>
                    <Form.Label>제목</Form.Label>
                    <Form.Control className='my-3' name='title'
                        placeholder='제목을 입력하세요.' value={title} onChange={onChange}/>
                    <Form.Label>작성자</Form.Label>
                    <Form.Control className='my-3' name='writer'
                        placeholder='작성자를 입력하세요' value={writer} onChange={onChange} />
                    <Form.Label>내용</Form.Label>
                    <Form.Control as='textarea' rows={10} className='my-3' name='contents'
                        placeholder='내용을 입력하세요' value={content} onChange={onChange} />
                    <div className="text-center">
                        <Link to={'/'}>
                            <Button className='mx-2 px-3 btn-sm'>목록</Button>
                        </Link>
                        <Button className="mx-2 px-3 btn-sm" onClick={onSubmit}>저장</Button>
                        <Button className="mx-2 px-3 btn-sm" onClick={onReset}>초기화</Button>
                    </div>
                </Form>
            </Col>
        </Row>

    );
};

export default BoardWrite;