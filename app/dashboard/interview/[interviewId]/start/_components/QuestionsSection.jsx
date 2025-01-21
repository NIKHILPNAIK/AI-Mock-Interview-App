import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion,activeQuestionIndex}) {

  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
    else{
      alert('Speech synthesis not supported for this browser')
    }
  }



  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>


    {mockInterviewQuestion.map((question, index) => (
  <h3
    key={index} 
    className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
    ${activeQuestionIndex === index && '!bg-purple-600 !text-white'}`}
  >
    Question {index + 1}
  </h3>

))}


      </div>

      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

      <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>

      <div className='border p-5 rounded-lg bg-blue-100 my-10 mt-20'>
        <h2 className='flex items-center gap-2 text-blue-700'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-blue-700  my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>

    </div>
  )
}




export default QuestionsSection
