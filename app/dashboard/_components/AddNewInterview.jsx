"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle, LoaderCircleIcon } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const[jsonResponse, setJsonResponse] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(jobPosition, jobDescription, yearsOfExperience);
    const InputPrompt="Job Position:"+jobPosition+", Job Description: "+jobDescription+" Years of Experience:"+yearsOfExperience+", Depends on this information please give me"+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+"Interview question with Answered in Json Format, Give Question and Answered as field in JSON"
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJSONResp= (result.response.text()).replace('```json', '').replace('```', '').trim();
    console.log(JSON.parse(MockJSONResp));  
    setJsonResponse(MockJSONResp);

    if(MockJSONResp){
    const resp=await db.insert(MockInterview).values({
      mockId: uuidv4(),
      jsonMockResp: MockJSONResp,
      jobPosition: jobPosition,
      jobDesc: jobDescription,
      jobExperience: yearsOfExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt:moment().toDate()
    }).returning({mockId: MockInterview.mockId});

    console.log("Inserted ID is", resp);
    if(resp){
      setOpenDialog(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId);
    }
    
  }else{
    console.log("No Mock JSON Response Error");
  }
    setLoading(false);
  }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} >

        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='font-bold text-2xl'>Tell us about your job Interviewing</DialogTitle>
            <DialogDescription >
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className='text-sm font-semibold mb-4'>Add Details about your Job position/role, Job description, and years of experience</h2>

                  <div className='mt-7 my-3'>
                    <label>Job Position/Role</label>
                    <Input placeholder='Ex. Software Engineer' required onChange={(event) => setJobPosition(event.target.value)} />
                  </div>

                  <div className='mt-7 my-3'>
                    <label>Job Description Tech Stack</label>
                    <Textarea placeholder='Ex. React, Node.js, MongoDB, Express, etc.' required onChange={(event) => setJobDescription(event.target.value)} />
                  </div>

                  <div className='mt-7 my-3'>
                    <label>Years of Experience</label>
                    <Input placeholder='Ex. 5' type='number' required max="50" min="0" onChange={(event) => setYearsOfExperience(event.target.value)} />
                  </div>
                </div>
                <div className='flex justify-end gap-5'>
                  <Button type='button' variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type='submit' disabled={loading}>{loading ? 
                    <>
                  <LoaderCircle className='animate-spin'/>'Generating from AI'
                  </>
                   : "Start Interview"}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default AddNewInterview
