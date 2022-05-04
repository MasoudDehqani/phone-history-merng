import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import type { CrudMethods, PhonesDataType, ReviewsDataType } from "./types";
// import BaseUrls from "constants/baseUrls";

const getQueryParamValue = (params: ParsedUrlQuery | undefined): [string, string | string[]] => {
  const paramsObjectExists = !!params && Object.entries(params).length !== 0;
  if (!paramsObjectExists) return ["", ""];
  // const paramsObject: { [key: string]: string } = JSON.parse(JSON.stringify(params))
  return Object.entries(params)[0];
  // return Object.values(paramsObject)[0];
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
    const params = getQueryParamValue(ctx.params);
    const query = params[0] !== "" ? `
      query ($${params[0]}: String) {
        phones(${params[0]}: $${params[0]}) {
          id
          brand
          model
          priceRange
          reviewsCount
          avgRate
        }
      }` : `
        query {
          phones {
            _id
            brand
            model
            priceRange
            reviewsCount
            avgRate  
          }
        }`
    
    try {
      const phonesData = await fetch("http://localhost:3333/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: {
            [params[0]]: params[1]
          }
        }),
      });
      const phonesDataJson = await phonesData.json();
      console.log(phonesDataJson);
      return {
        props: {
          phones: phonesDataJson.data.phones,
        }
      }
    } catch(err) {
      console.log(err)
      return {
        props: {}
      }
    }
  }

  return getServerSideProps;
}

export const handleReviewsServerSideRequests = (): GetServerSideProps => {
  const getServerSideProps: GetServerSideProps = async (ctx) => {
    const queryParam = getQueryParamValue(ctx.params);
    // const response: ReviewsDataType = await handleRequest(BaseUrls.ReviewsBaseUrl, queryParam);
    // const { data } = response;
    
    // return {
    //   props: {
    //     data
    //   }
    // }

    const query = `
      query ($phoneId: ID){
        reviews(phoneId: $phoneId) {
          id
          avgRate
          brand
          model
          reviews {
            rate
            text
          }
        }
      }`

    const reviewsResponse = await fetch("http://localhost:3333/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { phoneId: queryParam[1] }
      })
    })
    const reviews = await reviewsResponse.json()
    return {
      props: {
        data: reviews.data.reviews
      }
    }
  }

  return getServerSideProps;
}
