import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { getProblemAsync } from '../actions/problem';
import { submitCodeAsync } from '../actions/submissions';

import Header from '../components/Header';
import ProblemContent from '../components/Problem/ProblemContent';
import ProblemSideBar from '../components/Problem/ProblemSideBar';
import { Problem } from '../models/Problem';


const ProblemPage = ({ match }: RouteComponentProps<ProblemPageRouteParams>) => {

    const [problem, setProblem] = useState(new Problem({}))
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProblemAsync(match.params.problemId).then(problem => setProblem(problem))
    }, [match.params.problemId])

    const history = useHistory();

    const goToSubmissionPage = (submissionId: string) => {

        history.push(`/submission/${submissionId}`);
    }

    const onSubmitQuestion = (language: string, file: File | undefined) => {
        if (file === undefined) return;
        setIsLoading(true);
        submitCodeAsync(problem.customId, file, language, "123")
            .then((submission) => {
                goToSubmissionPage(submission.id);
            })
            .catch((error) => setIsLoading(false))
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
                    isLoading={isLoading}
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