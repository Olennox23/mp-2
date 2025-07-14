import { useState, useEffect } from "react";
import type { Question } from "../types";
import {AnswerDisplay} from "./AnswerDisplay.tsx";
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
   align-items: center;
    background-color: lightblue;
    
    height: 100vh;
`;


const StyledDiv2 = styled.div`
    text-align: center;
    font-size: calc(5px + 2vh);
    width: 50vw;
`

export default function QuestionDisplay() {
    const [questions, setQuestions] = useState<Question[]> ([]); {/* create a variable called questions, which is an array that holds the array of each question inserted*/}
    useEffect(() =>{
        async function fetchQuestions() {
            const res = await fetch(`https://opentdb.com/api.php?amount=50`);{/* wait for data to load*/}
            const data = await res.json();
            setQuestions(data.results);
            console.log(data.results); {/* check data results in console */}
        }
        fetchQuestions().catch((e) => console.log(e + "error extracting data"));
    }, []);

    return(
        <StyledDiv>
            {/*check that questions.length is >0, causes errors if I dont, make sure data exists*/}
            {questions.length > 0 && (
                <div>
                    <StyledDiv2>
                        <h2>Trivia Question</h2>
                    </StyledDiv2>
                    <AnswerDisplay questions= {questions}/> {/* use answer display component to handle the array of quesitons */}

                </div>

            )}
        </StyledDiv>
    );
}