import React, {FC} from 'react';

type ObjectTopic = {
    name: string,
    htmlUrl: string,
    forksCount: number,
    topics: Array<string>,
    visibility: string,
    openIssues: number,
    watchers: number
}

type TopicProps = {
    gitData: Array<ObjectTopic>;
};

export const Topic: FC<TopicProps> = ({ gitData }) => {
    console.log(gitData);
  return (
    <>
    {gitData.map((item, index) => {
        return(
        <section className="w-4/5 bg-[#3D1D2E] rounded-md p-3 shadow-2xl mb-4" key={index}>
            <div className="w-full h-10 flex justify-between">
                <span>{item.name}</span>
                <span><a href={item.htmlUrl} className="underline-offset-1">Go to the Repo</a></span>
            </div>
            <div className="w-full h-10 flex justify-between">
                <span>Forks Count: {item.forksCount}</span>
                <span>Open Issues: {item.openIssues}</span>
                <span>Watchers: {item.watchers}</span>
                <span>Visibility: {item.visibility}</span>
            </div>
            <div className="w-full h-10 flex flex-wrap">
                {item.topics.map((item, index) => <span className="mr-2" key={index}>#{item}</span>)}
            </div>
        </section>
        )
    })}
    </>
  )
}