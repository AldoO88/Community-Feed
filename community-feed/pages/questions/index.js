import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const QuiestionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const CardLink = styled.span`
    text-decoration: none;
`;

const Questions =  () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const router = useRouter();
    const { page } = router.query;

    useEffect(() => {
        async function fetchData(){
            const data = await fetch(`https://api.stackexchange.com/2.2/questions?${page ? `page=${page}&` : ''}order=desc&sort=hot&tagged=reactjs&site=stackoverflow`);
            const result = await data.json();
            if(result){
                setQuestions(result.items);
                setHasMore(result.has_more);
                setLoading(false);
            }
        }
        fetchData();
    }, [page]);
    
    return (
        <QuiestionContainer>
            <h2>Questions</h2>
            {loading ? (
                    <span>loading...</span>
                ) : (
                    <>
                    <div>
                        {questions.map((question) => (
                                <Link
                                    key={question.question_id}
                                    href={`/questions/${question.question_id}`}
                                >
                                    <CardLink>
                                        <Card
                                            title={question.title}
                                            views={question.view_count}
                                            answers={question.answer_count}
                                        />
                                    </CardLink>
                                </Link>
                        ))}
                    </div>
                    <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
                    </>
                )
            }
        </QuiestionContainer>
    );
}


export default Questions;
