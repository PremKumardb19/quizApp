import axios from "axios"
import { shuffleArray } from "./utils"
export enum Difficulty{
    easy="easy",
    medium="medium",
    hard="hard"
}

export type Question={
    category:string,
    correct_answer:string,
    difficulty:string,
    incorrect_answers:string[],
    question:string,
    type:string
}

export type QuestionState=Question &{answers:string[][]}

export const fetchQuestions=async(amount:number,difficulty:Difficulty)=>{
   const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
   let {data}=await axios.get(endpoint)
   return data.results.map((question:Question)=>(
     {
        ...question,
        answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
     }
   ))
}