
import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
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

const Questions =  ({questions, hasMore, page}) => {  

    
    return (
        <>
        <Head>
            <title>Questions</title>
        </Head>
        <QuiestionContainer>
            <h2>Questions</h2>
                    <div>
                        {questions && questions.map((question) => (
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
                    
        </QuiestionContainer>
        </>
    );
}

 export const getServerSideProps = async (context) =>{
    const { page } =  context.query;
    const data = await fetch(`https://api.stackexchange.com/2.2/questions?${
        page ? `page=${page}&` : ''
      }order=desc&sort=hot&tagged=reactjs&site=stackoverflow`,);
      const result = await data.json();
      return{
        props: {
            questions: result.items,
            hasMore: result.has_more,
            page: page || 1,
        }
      };
}

export default Questions;
