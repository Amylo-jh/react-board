import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [boardList, setBoardList] = useState({});
    const getBoardList = async() => {
        const board = await axios('/list')
        console.log(board);
        setBoardList(board.data);
    }

    useEffect(() => {
        getBoardList();
    }, [])

    if(boardList.length > 0)
    {
        return (
            <div className='board-list'>
                <h1>게시글 목록</h1>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>
                                    <Link to = {{
                                        pathname : `/view/${b.id}`
                                    }}>{b.title}</Link>
                                </td>
                                <td>{b.writer}</td>
                                <td>{b.reg_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Link to={`/write`}>
                    <Button btn-sm>작성하기</Button>
                </Link>
            </div>
        );
    }
};

export default BoardList;