"use client";
import React, { FC, useState } from "react";
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/globalPagination.css';

interface GitData {
    forksCount: number;
    htmlUrl: string;
    name: string;
    openIssues: number;
    topics: string[];
    visibility: string;
    watchers: number;
}
  
type ChildComponentProps = {
    gitData: GitData[];
    page: number;
    handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => {};

};

const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          ul: {
            '& .MuiPaginationItem-root': {
              color: '#fff', // Set your desired text color here
            },
          },
        },
      },
    //   MuiPaginationItem: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: '#3D1D2E', // Set your desired background color here
    //       },
    //     },
    //   },
    },
});

export const Topic: FC<ChildComponentProps> = ({ gitData, page, handleChangePage }) => {
  return (
    <>
      {gitData.map((item, index) => {
        return (
          <section
            className="w-4/5 bg-[#3D1D2E] rounded-md p-3 shadow-2xl mb-4"
            key={index}
          >
            <div className="w-full h-10 flex justify-between">
              <span>{item.name}</span>
              <span>
                <a href={item.htmlUrl} className="underline">
                  Go to the Repository
                </a>
              </span>
            </div>
            <div className="w-full h-10 flex justify-between">
              <span>Forks Count: {item.forksCount}</span>
              <span>Open Issues: {item.openIssues}</span>
              <span>Watchers: {item.watchers}</span>
              <span>Visibility: {item.visibility}</span>
            </div>
            <div className="w-full flex flex-wrap">
              {item.topics.map((item, index) => (
                <span className="mr-2" key={index}>
                  #{item}
                </span>
              ))}
            </div>
          </section>
        );
      })}
      <ThemeProvider theme={theme}>
        <Pagination 
            count={10} 
            color="secondary" 
            page={page} 
            onChange={(e, value) => handleChangePage(e, value)} 
        />
      </ThemeProvider>
    </>
  );
};