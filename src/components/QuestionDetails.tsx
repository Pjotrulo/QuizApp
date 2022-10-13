import React from 'react';

const QuestionDetails = ({title, paragraph}: { title: string, paragraph: string }) => {
    return (
        <>
            <div className="question-details__box">
                <h2 className="question-details__box--title">
                    {title}:
                </h2>
                <p className="question-details__box--paragraph">{paragraph}</p>
            </div>
        </>
    )
}

export default QuestionDetails;