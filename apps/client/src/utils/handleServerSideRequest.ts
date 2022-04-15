import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import type { CrudMethods, PhonesDataType, ReviewsDataType } from "./types";
// import BaseUrls from "constants/baseUrls";

const getQueryParamValue = (params: ParsedUrlQuery | undefined): string => {
  const paramsObjectExists = !!params && Object.entries(params).length !== 0;
  if (!paramsObjectExists) return "";
  const paramsObject: { [key: string]: string } = JSON.parse(JSON.stringify(params))
  return Object.values(paramsObject)[0];
}

const handleRequest = async (url: string, param: string) => {
  // try {
  //   const responsePromise = await fetch(`${url}${param}`, {  });
  //   const response = responsePromise.json()
  //   return response;
  // } catch(err) {
  //   console.log(err)
  // }
}

export const handlePhonesServerSideRequests = (): GetServerSideProps => {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = `
      query {
        phones {
          id
          brand
          model
          priceRange
          reviewsCount
          avgRate
        }
      }`
    
    const phonesData = await fetch("http://localhost:3333/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const phonesDataJson = await phonesData.json();
    return {
      props: {
        phones: phonesDataJson.data.phones,
      }
    }
  }

  return getServerSideProps;
}

export const handleReviewsServerSideRequests = (): GetServerSideProps => {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const queryParam = getQueryParamValue(ctx.params);
    // const response: ReviewsDataType = await handleRequest(BaseUrls.ReviewsBaseUrl, queryParam);
    // const { data } = response;
    
    // return {
    //   props: {
    //     data
    //   }
    // }

    return {
      props: {}
    }
  }

  return getServerSideProps;
}
