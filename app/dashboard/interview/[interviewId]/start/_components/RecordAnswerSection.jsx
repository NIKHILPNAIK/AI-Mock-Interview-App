'use client'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackprompt = `Question: ${mockInterviewQuestion[activeQuestionIndex].question}, User Answer: ${userAnswer}, Please give us a rating and feedback for this answer in JSON format with 'rating' and 'feedback' fields`;

    const result = await chatSession.sendMessage(feedbackprompt);

    // Extract and clean the response
    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '').trim();

    try {
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      console.log("Feedback Response:", JsonFeedbackResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId || null,
        question: mockInterviewQuestion[activeQuestionIndex]?.question || null,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer || null,
        userAns: userAnswer || null, // Using the actual user input (a string)
        feedback: JsonFeedbackResp?.feedback || null,
        rating: JsonFeedbackResp?.rating || null,
        createdAt: moment().toDate(),
        userEmail: user?.primaryEmailAddress?.emailAddress || null,
      });

      if (resp) {
        toast("User Answer saved successfully");
      }
    } catch (error) {
      console.error("Error parsing feedback response:", error);
      toast("Failed to parse feedback response.");
    } finally {
      setUserAnswer('');
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col mt-20 items-center justify-center bg-black rounded-lg p-5 my-3'>
        <Image
          src={"/webcam.png"}
          alt='webcam'
          width={200}
          height={200}
          className='absolute'
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
            borderRadius: '10px',
          }}
        />
      </div>

      <Button
        variant='ghost'
        className='my-10 border border-black'
        onClick={StartStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className='flex items-center gap-1 text-red-500 animate-pulse'>
            <StopCircle />Stop Recording
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>

      
    </div>
  );
}

export default RecordAnswerSection;
