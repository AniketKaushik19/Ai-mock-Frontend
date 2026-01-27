import InterviewPage from "../InterviewPage";


export default async function Page({ params }) {
 

  const  {interviewId}=await params;

  if(interviewId) return <InterviewPage interviewId={interviewId} />;
  
  
;
  

 
}
