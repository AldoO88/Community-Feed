import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "@/components/Card";

const QuiestionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

const Questions =  () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const data = await fetch('https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow');
            const result = await data.json();
            if(result){
                setQuestions(result.items);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <QuiestionContainer>
            <h2>Questions</h2>
            {
                loading ? (
                    <span>loading...</span>
                ) : (
                    <div>
                        {
                            questions.map((question) => (
                               <Card
                                    key={question.question_id}
                                    title={question.title}
                                    views={question.view_count}
                                    answers={question.answer_count}
                               />
                            ))
                        }
                    </div>
                )
            }
        </QuiestionContainer>
    );
}

export default Questions;
