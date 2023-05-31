import { FC } from 'react';
import Image from 'next/image'
import img5 from '../../public/img5.png';


const Home: FC = () => {
  return (
    <>
      <main className="w-full">
        <div className="pt-14">
          <section className="w-4/5 my-0 mx-auto flex">
            <div>
            <h1 className="text-color-white text-8xl">
              Welcome to SocialCode!
            </h1>
            <p>An easier way to get inspired.</p>
            </div>
            <div>
            <Image src={img5} alt='trial' width={400}
      height={400} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
