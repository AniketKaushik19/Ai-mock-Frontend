'use client'

import Navbar from "@/app/_component/Navbar";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import React from "react"

let browserQueryClient=undefined;



function makeQueryClient(){
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60*4, 
        retry: 3,
      },
      mutations: {
        retry: 2, 
      },
    },
  });

}

function getQueryClient(){
  if(typeof window==='undefined'){
 return makeQueryClient();
  }else {
    if(!browserQueryClient){
      browserQueryClient=makeQueryClient();

    }
    return browserQueryClient;
  }
}

const queryClient=getQueryClient();
export const QueryProvider=({children})=>{

return (
    <QueryClientProvider client={queryClient}>
  
{children}
        </QueryClientProvider>
)     

}