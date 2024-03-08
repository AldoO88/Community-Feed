import Questions, {
  getServerSideProps as getServerSidePropsQuestions
} from './questions';

export const getServerSideProps = (context) => {
  return getServerSidePropsQuestions(context)
}

const Home = (props) => {
  return <Questions {...props}/>;
}

export default Home;
