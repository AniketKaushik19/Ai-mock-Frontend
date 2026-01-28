import FeedbackPage from "../feedback";


export default async function Page({ params }) {
 

  const  {id}=await params;
  
  

  if(id) return <FeedbackPage feedbackId={id} />;
  
  
;
  

 
}
