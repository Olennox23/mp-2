import { useState , useEffect } from "react";
import styled from "styled-components";
import type { Question } from "../types";
type AnswerProps = {
    questions: Question[];
};
/* edit button */
const StyledButton = styled.button` 
     width: 20vw; 
     margin: 2vh auto;
    font-size: calc(5px + 2vh); 
    @media (max-width: 768px) {
        font-size: calc(5px + 1vh);
    }
    `
/* make a table to hold the question and answers */
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
   align-items: center;
    width: 50vw;
    margin: 0 auto;
    border: 1px solid black;
    background-color: lightyellow;
    
`;
/* makes the next question appear below question and answer box */
const StyledDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
   
  
`
/* edit the appearance of categories and question */
const StyledDiv3 = styled.div`
    width: 50vw;
    margin: 0 auto;
    text-align: center;
    padding: 1vh  0;
    font-size: calc(5px + 2vh);
    @media (max-width: 768px) {
        font-size: calc(5px + 1vh);
    }
`
/* edit the style of the answers */
const StyledLabel = styled.label`
    border: 1px solid black;
    padding: 1vh 0;
    width: 50vw;
    font-size: calc(10px + 1vh);
    font-family:   sans-serif , Arial;
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: calc(5px + 1vh);
    }
    
`
/*styles the box which appears when answer is selected */
const StyledP = styled.p<{correct : boolean }>`
    background-color: ${({ correct }) => (correct ? "green" : "red")}; /* if correct is true, background color is green, if false red*/
    font-weight: bold;
    width: 100%;
    text-align: center;
    font-size: calc(10px + 2vw);
    margin: 0;
    padding: 1vh 0;
    @media (max-width: 768px) {
        font-size: calc(5px + 1vh);
    }
`
{/* helper function used to randomize the order of answers when when a question appears
    uses fisher yates algorithm
    makes */}
function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array]; /* creates copy */
    for (let i = newArr.length - 1; i > 0; i--) {  /* iterates from length of array to bottom */
        const j = Math.floor(Math.random() * (i + 1)); /* randomizes number beetween 0 and i */
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]]; /* swaps i and and the random number in the array */
    }
    return newArr;
}

export function AnswerDisplay({questions}: AnswerProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null); {/* holds the answer the user has selected right now as a string,
                                                                                              if none is selected, we make the state null*/}
    const[ currentIndex, setCurrentIndex ] = useState(0); {/* used to iterate through questions*/}
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null); {/* if answer is selected update this, if no answer the state is null*/}
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]); {/* holds the shuffled answers, changes after every question */}

    /* use effect, we make sure this runs every time a new questions is clicked
     then it loads the questions into an array called All answers
     after that we pass all answers into the shuffled answers array
     this only happens when a new question is toggled, so we reset selected option and set Selected option
     this makes sure no selections remain when we select a new question
    *  */
    useEffect(() => {
        const allAnswers = [
            ...questions[currentIndex].incorrect_answers,
            questions[currentIndex].correct_answer,
        ];
        const shuffled = shuffleArray(allAnswers);
        setShuffledAnswers(shuffled);
        setSelectedOption(null);
        setSelectedAnswer(null);
    }, [currentIndex, questions]);

    function handleClick() {
        setCurrentIndex(currentIndex + 1); /* iterate to new question, all text above reruns */

    }
    function handleAnswers(value:string){
        setSelectedOption(value); /* SelectedOptions */
        setSelectedAnswer(value === questions[currentIndex].correct_answer); /* the selection answer is compared to the correct answer,
        true or false passed
         */
    }
    return(
        <StyledDiv2>
            <StyledDiv>
                <StyledDiv3> {/* list out category, title, difficult, and question*/}
                    <h3> Category: {questions[currentIndex].category}  </h3>
                    <h4> Difficulty: {questions[currentIndex].difficulty}</h4>
                    <p>{questions[currentIndex].question}</p>
                </StyledDiv3> {/* iterate through answer in our shuffled All answers array*/}
                {shuffledAnswers.map((answer) => (
                    <StyledLabel > {/* makes the answers appear in a multiple choice style*/}
                       <input type="radio"
                              name="answer"
                              value={answer}
                              checked={selectedOption === answer}
                              onChange = {() => handleAnswers(answer)}/> {/* calls handle answers to check if correct */}
                        {answer}
                  </StyledLabel>
                    ))}
                {/* handle answers affectes the value of selected Answer
                    if answer is null, no answer box appears
                    if it isnt null, we input selected answer
                    if it is true, Correct appears, false, incorrect appears
                    Selected answer is passed to the sytledP which then checks
                    if it is true or false, if true the answer box is green, red otherwise
                 */}
                {selectedAnswer === null ? null : (
                    <StyledP correct={selectedAnswer}>
                        {selectedAnswer ? "Correct" : "Incorrect"}

                    </StyledP>
                )}
            </StyledDiv>
            <StyledButton onClick={handleClick}> Next Question</StyledButton> {/* index to the next question */}
        </StyledDiv2>
    );

}