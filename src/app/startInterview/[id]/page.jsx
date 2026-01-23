import GetStartedPage from "../_components/StartInterviewPage";


export default async function Page({ params }) {
 

  const  {id}=await params;
  
  if(id)  return <GetStartedPage id={id} />;
  

 
}
