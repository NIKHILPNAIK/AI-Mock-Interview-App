"use client"
import { db } from '@/utils/db'
import React, { useEffect, useState } from 'react'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Interview({params}) {
  const [interviewData, setInterviewData] = useState([]);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  // Use React.use() to unwrap params
  const interviewId = params?.interviewId || null; // Ensure it is accessed after unwrapping

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className='my-10'>
      <h2 className='text-2xl font-bold'>Let's get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='my-5 flex flex-col gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position:  </strong>{interviewData.jobPosition}</h2>
            <h2 className='text-lg '><strong>Job Description/Tech Stack:  </strong>{interviewData.jobDesc}</h2>
            <h2 className='text-lg '><strong>Years of Experience:  </strong>{interviewData.jobExperience}</h2>
          </div>

          <div className='flex flex-col  p-5 rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex items-center gap-2 text-yellow-500'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webcamEnabled ? 
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: 300, 
                width: "100%", 
                zIndex: 10,
                border: '1px solid #000',
                borderRadius: '13px',
              }}
            /> 
            : 
            <>
              <WebcamIcon className='w-full h-72 my-1 p-20 bg-secondary rounded-lg border'/>
              <Button className='w-full bg-green-500 text-white' onClick={() => setWebcamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </>
          }
        </div>
      </div>

      <div className='flex justify-end items-end'>
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
