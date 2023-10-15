import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const BoardView = () => {
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const getBoard = async() => {
        const board = await axios.get(`/view/${id}`)
        setBoard(board.data[0]);
    }

    useEffect(() => {
        getBoard()
    }, [])

    const onDelete = async() => {
        if(window.confirm(`${id}번 게시글을 삭제하시겠습니까?`)){
            await axios.post(`/delete/${id}`)

            window.location.href = "/"
        }
    }
    return (
        <div className='board-view'>
            <Row className='my-5'>
                <Col className = 'px-5'>
                    <h1 className='my-5 text-center'>{board.id}번 게시글 제목</h1>
                    <div className='text-end my-2'>
                        <Link to={'/'}>
                            <Button className='btn-sm mx-2'>목록</Button>
                        </Link>
                        <Link to={`/modify/${id}`}>
                            <Button className='btn-sm mx-2'>수정</Button>
                        </Link>
                        <Button className='btn-sm mx-2' variant='danger' onClick={onDelete}>삭제</Button>
                    </div>

                    <Card>
                        <Card.Body>   
                            <h5>[{board.id}] {board.title}</h5>
                            <hr/>
                            <div className="cArea">{board.contents}</div>
                        </Card.Body>
                        <Card.Footer>
                            Created on {board.reg_date} by {board.writer}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BoardView;