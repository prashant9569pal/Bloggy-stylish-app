import { Button } from "flowbite-react";

import React from "react";

function CallToAction() {
  return (
    <div
      className="flex flex-col sm:flex-row p-3 border-teal-500 border-2 justify-center 
    items-center  rounded-tl-3xl rounded-br-3xl text-center "
    >
      <div className="flex-1  justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about Skills?</h2>
        <p className="text-gray-500 my-2">
          Checkout this website with my projets
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://portfolio-git-main-prashant9569pals-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1 rounded-lg w-full object-cover ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBxY53u5CI_-wfiqxqkIVohLTF_cqJei0_aYKGzeYnIeFnBt948a-Y5Cz2EJBM35WROg&usqp=CAU" />
      </div>
    </div>
  );
}

export default CallToAction;
