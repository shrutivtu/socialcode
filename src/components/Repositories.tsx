import React, { FC } from "react";
import { GitRepoProps } from "@/types";

type ChildComponentProps = {
  gitData: GitRepoProps[];
  // page: number;
  // handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => {};
};

export const Repositories: FC<ChildComponentProps> = ({ gitData }) => {
  return (
    <>
      {gitData.map((data, index) => {
        return (
          <section className="w-1/2 bg-[#3D1D2E] rounded-md p-3 shadow-2xl mb-4" key={index}>
            <div className="flex justify-between">
              <p>{data.name}</p>
              <a href={data.html_url}>Go to the Repository</a>
            </div>
          </section>
        );
      })}
    </>
  );
};