import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardModify = () => {

    const { id } = useParams();
    const [board , setBoard] = useState({});

    const getBoard = async() => {
        const board = await axios.get(`/view/${id}`);
        setBoard(board.data[0]);
    }

    useEffect(()=>{
        getBoard();
    }, []);

    const [form, setForm] = useState({
        title: '',
        contents: '',
        writer: ''
    })
    const {title, contents, writer} = form;

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
        else if(contents === ''){
            alert('내용을 입력하세요');
        }
        else{
            if(window.confirm('게시글을 수정하시겠습니까?')){
                await axios.post(`/modify/${id}`, form);
                window.location.href="/";
            }
        }
    }

    const onReset = () => {
        setForm({
            ...form,
            title: '',
            content: '',
            writer: ''
        });
    }

    return (
        <Row className='my-5'>
            <Col className='p-5'>
                <h1 className="text-center my-5">{board.id}번 게시글 수정</h1>
                <Form>
                    <Form.Label>제목</Form.Label>
                    <Form.Control className='my-3' name='title'
                        placeholder={board.title} value={title} onChange={onChange} />
                    <Form.Label>작성자</Form.Label>
                    <Form.Control className='my-3' name='writer'
                        placeholder={board.writer} value={writer} onChange={onChange}/>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as='textarea' rows={10}
                        className='my-3' name='contents'
                        placeholder={board.contents} value={contents} onChange={onChange}/>
                    <div className="text-center">
                        <Link to={'/'}>
                            <Button className='mx-2 px-3 btn-sm'>목록</Button>
                        </Link>
                        <Button className="mx-2 px-3 btn-sm" onClick={onSubmit}>수정</Button>
                        <Button className="mx-2 px-3 btn-sm" variant='secondary' onClick={onReset}>초기화</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    );
};

export default BoardModify;