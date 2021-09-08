import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getProblemAsync } from '../actions/problem';
import Header from '../components/Header';
import ProblemContent from '../components/Problem/ProblemContent';
import ProblemSideBar from '../components/Problem/ProblemSideBar';
import { Problem } from '../models/Problem';


const ProblemPage = ({ match }: RouteComponentProps<ProblemPageRouteParams>) => {

    const [problem, setProblem] = useState(new Problem({}))
    useEffect(() => {
        getProblemAsync(match.params.problemId).then(problem => setProblem(problem))
    }, [match.params.problemId])

    const history = useHistory();

    const goToSubmissionPage = (submissionId: string) => {
        history.push(`/submission/${submissionId}`);
    }
    
    const onSubmitQuestion = (language: string, file: File | undefined) => {
        console.log('File submitted');
        console.log(language);
        console.log(file)
        goToSubmissionPage("123")
    }

    return (
        <div>
            <Header />
            <div className="flex flex-row">
                <ProblemContent 
                    className="w-two-thirds"
                    problem={problem}
                />
                <ProblemSideBar
                    onSubmit={onSubmitQuestion}
                    problem={problem}
                    className="w-third"
                />
            </div>
        </div>
    );
}
export default ProblemPage;

type ProblemPageRouteParams = { problemId: string };